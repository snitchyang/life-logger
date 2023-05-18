import base64
import os
import uuid

from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import User, Friendship
from api.serializers import UserSerializer, UserHeaderSerializer
from lifelogger import settings


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer

    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserSelf(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user: User = request.user
        if user is not None:
            return Response(UserSerializer(User.objects.get(id=user.id), context={'request': request}).data, status=200)
        return Response(status=401)

    def post(self, request: Request):
        user = request.user
        data = request.data
        username = data.get('username')
        if username is not None:
            if username != user.username and User.objects.filter(username=username):
                return Response({'message': 'invalid username.', 'success': False})
            user.username = username
        email = data.get('email')
        if email is not None:
            if email != user.email and User.objects.filter(email=email):
                return Response({'message': 'invalid email.', 'success': False})
            user.email = email
        phone_number = data.get('phone_number')
        if phone_number is not None:
            if phone_number != user.phone_number and User.objects.filter(phone_number=phone_number):
                return Response({'message': 'invalid phone_number.', 'success': False})
            user.phone_number = phone_number
        gender = data.get('gender')
        if gender is not None:
            user.gender = gender
        biography = data.get('biography')
        if biography is not None:
            user.biography = biography
        school = data.get('school')
        if school is not None:
            user.school = school
        user.save()
        return Response({'message': 'success', 'success': True}, status=200)


class AvatarView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        user = request.user
        avatar_base64 = request.data.get('avatar_base64')
        if avatar_base64 is None:
            return Response({'message': 'lack data', 'success': False}, status=200)
        uid = uuid.uuid1()
        database_path = 'avatar/' + str(uid) + '.jpg'
        img_path = os.path.join(settings.MEDIA_ROOT, database_path)
        with open(img_path, 'wb') as out:
            out.write(base64.b64decode(avatar_base64))
            out.flush()
        user.avatar = database_path
        user.save()
        return Response({'message': 'success', 'success': True}, status=200)


class UserFriends(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = request.user
        following = UserHeaderSerializer(
            User.objects.filter(id__in=Friendship.objects.filter(user=user).values('friend_id')),
            context={'request': request}, many=True).data

        follow_me = UserHeaderSerializer(
            User.objects.filter(id__in=Friendship.objects.filter(friend=user).values('user_id')),
            context={'request': request}, many=True).data

        return Response({'following': following, 'follow_me': follow_me}, status=200)

    def post(self, request: Request):
        user = request.user
        friend_id = request.data.get('friend')
        Friendship.objects.create(friend_id=friend_id, user=user)
        return Response({'message': 'success', 'success': True}, status=200)

    def delete(self, request: Request):
        user = request.user
        friend_id = request.data.get('friend')
        try:
            friendship = Friendship.objects.get(friend_id=friend_id, user=user)
            friendship.delete()
        except:
            return Response({'message': 'fail', 'success': False})
        return Response({'message': 'success', 'success': True}, status=200)


class SearchUser(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        user = request.user
        friend_name = request.data.get('friend')
        friends = Friendship.objects.filter(user=user).values('friend_id')
        search_result: [] = User.objects.filter(username__contains=friend_name).exclude(id__in=friends)
        response = UserHeaderSerializer(search_result, many=True, context={'request': request}).data
        return Response(response, status=200)
