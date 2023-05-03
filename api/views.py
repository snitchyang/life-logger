import datetime
import json

from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
from django.urls import reverse
from rest_framework import generics, permissions
from rest_framework.authtoken.models import Token
from rest_framework.decorators import api_view
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from lifelogger import settings
from .serializers import *


@api_view(['GET'])
def api_root(request):
    return Response({
        'users': reverse('user-list'),
        'plans': reverse('plan-list'),
        'tags': reverse('tag-list'),
        'diaries': reverse('diary-list'),
        'comments': reverse('comment-list'),
        'posts': reverse('post-list'),
    })


def get_user(request: Request) -> User:
    token = request.headers.get('Authorization').split()[-1]
    return Token.objects.get(key=token).user


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserSelf(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user: User = get_user(request)
        if user is not None:
            return Response(UserSerializer(user, context={'request': request}).data, status=200)
        return Response(status=401)

    def put(self, request: Request):
        user = get_user(request)
        data = request.data
        username = data['username']
        if username != user.username and len(User.objects.filter(username=username)) > 0:
            return Response({'message': 'username'}, status=400)
        user.username = username
        email = data['email']
        if email != user.email and len(User.objects.filter(email=email)) > 0:
            return Response({'message': 'email'}, status=400)
        user.email = email
        phone_number = data['phone_number']
        if phone_number != user.phone_number and len(User.objects.filter(phone_number=phone_number)) > 0:
            return Response({'message': 'phone_number'}, status=400)
        user.phone_number = phone_number
        biography = data['biography']
        school = data['school']
        user.biography = biography
        user.school = school
        user.save()
        return Response({'message': 'success'}, status=200)


class UserFriends(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = get_user(request)
        following = [UserHeaderSerializer(friendship.friend, context={'request': request}).data for friendship in
                     Friendship.objects.filter(user=user).all()]
        follow_me = [UserHeaderSerializer(friendship.user, context={'request': request}).data for friendship in
                     Friendship.objects.filter(friend=user).all()]
        return Response({'following': following, 'follow_me': follow_me}, status=200)

    def post(self, request: Request):
        user = get_user(request)
        friend_id = request.data['friend']
        Friendship.objects.update_or_create(friend_id=friend_id, user=user)
        return Response({'message': 'success'}, status=200)

    def delete(self, request: Request):
        user = get_user(request)
        friend_id = request.data['friend']
        friendship = Friendship.objects.get(friend_id=friend_id, user=user)
        friendship.delete()
        return Response({'message': 'success'}, status=200)


class PlanList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = get_user(request)
        response = PlanSerializer(Plan.objects.filter(user=user).order_by('-due'), many=True).data
        return Response(response, status=200)


class PlanAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        due = data['due']
        content = data['content']
        Plan.objects.update_or_create(content=content, user=user, due=due, finished=False)
        return Response({'message': 'success'}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data['id']
        due = data['due']
        content = data['content']
        finished = data['finished']
        plan: Plan = Plan.objects.get(id=id)
        plan.due = due
        plan.content = content
        plan.finished = finished
        plan.save()
        return Response({'message': 'success'}, status=200)


class TagList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request):
        response = TagSerializer(Tag.objects.all(), many=True).data
        return Response(response, status=200)


# class TagDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DiaryList(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = get_user(request)
        diaries = DiarySerializer(Diary.objects.filter(user=user).order_by('-date'), many=True,
                                  context={'request': request}).data
        return Response(diaries, status=200)


# class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Diary.objects.all()
#     serializer_class = DiarySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DiaryImageDetail(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        data = request.data
        diary_id = data['diary']
        image = data['image']
        DiaryImage.objects.update_or_create(post_id=diary_id, path=image)
        return Response({'message': 'success'}, status=200)


class DiaryAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        title = data['title']
        content = data['content']
        tag_ids = request.data['tags']
        tag_ids = json.loads(tag_ids)
        diary = Diary.objects.create(title=title, content=content, user=user)
        diary.tag.clear()
        for tag_id in tag_ids:
            diary.tag.add(Tag.objects.get(pk=int(tag_id)))
        diary.save()
        return Response({'message': 'success'}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data['id']
        title = data['title']
        content = data['content']
        tag_ids = request.data['tags']
        tag_ids = json.loads(tag_ids)
        diary = Diary.objects.get(id=id)
        diary.title = title
        diary.content = content
        diary.tag.clear()
        for tag_id in tag_ids:
            diary.tag.add(Tag.objects.get(pk=int(tag_id)))
        diary.save()
        return Response({'message': 'success'}, status=200)


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        content = data['content']
        post_id = data['post']
        Comment.objects.create(post_id=post_id, content=content, user=user)
        return Response({'message': 'success'}, status=200)


class PostList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = get_user(request)
        friends = [friendship.friend for friendship in Friendship.objects.filter(user=user).all()]
        friends += [user]
        queryset = Post.objects.filter(user__in=friends).order_by('-date')
        paginator = Paginator(queryset, 10)
        page = paginator.page(request.query_params['page'])
        posts = PostSerializer(page, many=True, context={'request': request}).data
        for post in posts:
            post['liked'] = post['liker'].count(user.id) > 0
        return Response(posts, status=200)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostAdd(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        data = request.data
        location = data['location']
        content = data['content']
        user = get_user(request)
        post: Post = Post.objects.create(location=location, content=content, user=user)
        return Response({'post': post.id}, status=200)


class PostLike(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]
    def post(self, request: Request):
        data = request.data
        post_id = data['post']
        like = data['like']
        user = get_user(request)
        post: Post = Post.objects.get(id=post_id)
        if like is True:
            post.liker.add(user)
            post.likes += 1
        else:
            post.liker.remove(user)
            post.likes -= 1
        post.save()
        return Response({'message': 'success'}, status=200)


class PostImageAdd(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        data = request.data
        post_id = data['post']
        image = data['image']
        PostImage.objects.create(post_id=post_id, path=image)
        return Response({'message': 'success'}, status=200)


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user.last_login = datetime.datetime.now()
            user.save()
            return Response({'token': token.key})
        else:
            return Response({'error': 'Invalid username or password.'}, status=401)


class UserRegistrationView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = make_password(request.data.get('password'))
        email = request.data.get('email')
        gender = request.data.get('gender')
        avatar = request.data.get('avatar')
        school = request.data.get('school')
        phone_number = request.data.get('phone_number')
        User.objects.create_user(username=username, password=password
                                 , email=email, gender=gender, avatar=avatar, school=school, phone_number=phone_number
                                 )

        return Response({'message': 'User registered successfully.'})


class ForgotPasswordView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        email = request.data.get('email')

        form = PasswordResetForm({'email': email})

        if form.is_valid():
            opts = {
                'use_https': request.is_secure(),
                'from_email': settings.EMAIL_HOST_USER,
                'email_template_name': 'password_reset_email.html',
                'subject_template_name': 'password_reset_subject.txt',
            }
            form.save(**opts)
            return Response({'message': 'Password reset email sent.'})
        else:
            return Response({'errors': form.errors}, status=400)
