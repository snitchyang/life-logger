import base64
import datetime
import json
import os.path

from django.contrib.auth import authenticate
from django.contrib.auth.forms import PasswordResetForm
from django.contrib.auth.hashers import make_password
from django.core.paginator import Paginator
from django.shortcuts import render
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


class Test(APIView):
    permission_classes = [permissions.IsAuthenticated]

    def get(self, request: Request):
        users = Post.objects.values('user_id')
        data = User.objects.filter(id__in=users)
        print(data)
        # data = UserSerializer(users, many=True).data
        return Response(True)


def get_user(request: Request) -> User:
    return request.user


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
        user: User = get_user(request)
        if user is not None:
            return Response(UserSerializer(User.objects.get(id=user.id), context={'request': request}).data, status=200)
        return Response(status=401)

    def post(self, request: Request):
        user = get_user(request)
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
    def post(self, request: Request):
        user = get_user(request)
        avatar_base64 = request.data.get('avatar_base64')
        if avatar_base64 is None:
            return Response({'message': 'lack data', 'success': False}, status=200)
        # user = User.objects.get(id=1)
        uid = uuid.uuid1()
        img_path = os.path.join(settings.MEDIA_ROOT, 'avatar\\' + str(uid) + '.jpg')
        with open(img_path, 'wb') as out:
            out.write(base64.b64decode(avatar_base64))
            out.flush()
        user.avatar = img_path
        user.save()
        return Response({'message': 'success'}, status=200)


class UserFriends(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = get_user(request)
        following = UserHeaderSerializer(
            User.objects.filter(id__in=Friendship.objects.filter(user=user).values('friend_id')),
            context={'request': request}, many=True).data

        follow_me = UserHeaderSerializer(
            User.objects.filter(id__in=Friendship.objects.filter(friend=user).values('user_id')),
            context={'request': request}, many=True).data

        return Response({'following': following, 'follow_me': follow_me}, status=200)

    def post(self, request: Request):
        user = get_user(request)
        friend_id = request.data.get('friend')
        Friendship.objects.create(friend_id=friend_id, user=user)
        return Response({'message': 'success', 'success': True}, status=200)

    def delete(self, request: Request):
        user = get_user(request)
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
        user = get_user(request)
        friend_name = request.data.get('friend')
        friends = Friendship.objects.filter(user=user).values('friend_id')
        search_result: [] = User.objects.filter(username__contains=friend_name).exclude(id__in=friends)
        response = UserHeaderSerializer(search_result, many=True, context={'request': request}).data
        return Response(response, status=200)


class PlanList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = get_user(request)
        response = PlanSerializer(Plan.objects.filter(user=user).order_by('-due'), many=True).data
        return Response(response, status=200)


class PlanAdd(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        due = data.get('due')
        content = data.get('content')
        Plan.objects.update_or_create(content=content, user=user, due=due, finished=False)
        return Response({'message': 'success'}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data.get('id')
        due = data.get('due')
        content = data.get('content')
        finished = data.get('finished')
        plan: Plan = Plan.objects.get(id=id)
        plan.due = due
        plan.content = content
        plan.finished = finished
        plan.save()
        return Response({'message': 'success'}, status=200)


class TagList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        response = TagSerializer(Tag.objects.all(), many=True).data
        return Response(response, status=200)


# class TagDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DiaryList(APIView):
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        data = request.data
        diary_id = data.get('diary')
        image = data.get('image')
        DiaryImage.objects.update_or_create(post_id=diary_id, path=image)
        return Response({'message': 'success'}, status=200)


class DiaryAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        title = data.get('title')
        content = data.get('content')
        tag_ids = request.data.get('tags')
        tag_ids = json.loads(tag_ids)
        diary = Diary.objects.create(title=title, content=content, user=user)
        diary.tag.clear()
        for tag_id in tag_ids:
            diary.tag.add(Tag.objects.get(pk=int(tag_id)))
        diary.save()
        return Response({'message': 'success'}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data.get('id')
        title = data.get('title')
        content = data.get('content')
        tag_ids = request.data.get('tags')
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
    permission_classes = [permissions.AllowAny]


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.AllowAny]


class CommentAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = get_user(request)
        data = request.data
        content = data.get('content')
        post_id = data.get('post')
        Comment.objects.create(post_id=post_id, content=content, user=user)
        return Response({'message': 'success'}, status=200)


class PostList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = get_user(request)
        friends = [friendship.friend for friendship in Friendship.objects.filter(user=user).all()]
        friends += [user]
        queryset = Post.objects.filter(user__in=friends)

        page_size = int(len(queryset) / 6) + 1
        paginator = Paginator(queryset, 6)
        page = paginator.page(request.query_params['page'])
        posts = PostSerializer(page, many=True, context={'request': request}).data
        for post in posts:
            post['liked'] = post['liker'].count(user.id) > 0
        return Response({'data': posts, 'max': page_size}, status=200)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.AllowAny]


class PostAdd(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        data = request.data
        location = data.get('location')
        content = data.get('content')
        user = get_user(request)
        post: Post = Post.objects.create(location=location, content=content, user=user)
        return Response({'post': post.id}, status=200)


class PostLike(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        data = request.data
        post_id = data.get('post')
        like = data.get('like')
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
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        data = request.data
        post_id = data.get('post')
        image = data.get('image')
        PostImage.objects.create(post_id=post_id, path=image)
        return Response({'message': 'success'}, status=200)


class UserLoginView(APIView):
    permission_classes = [permissions.AllowAny]

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
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = make_password(request.data.get('password'))
        email = request.data.get('email')
        gender = request.data.get('gender')
        # avatar = request.data.get('avatar')
        # school = request.data.get('school')
        phone_number = request.data.get('phone_number')
        if not all([username, password, email, gender, phone_number]):
            return Response({'message': 'lack params.', 'success': False})
        if User.objects.filter(username=username):
            return Response({'message': 'invalid username.', 'success': False})
        if User.objects.filter(email=email):
            return Response({'message': 'invalid email.', 'success': False})
        if User.objects.filter(phone_number=phone_number):
            return Response({'message': 'invalid email.', 'success': False})
        User.objects.create_user(username=username, password=password
                                 , email=email, gender=gender, phone_number=phone_number
                                 )
        return Response({'message': 'User registered successfully.', 'success': True})


class ForgotPasswordView(APIView):
    permission_classes = [permissions.AllowAny]

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


class Statistic(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        user = User.objects.get(id=1)
        duration_type = request.query_params['duration']
        now_date = datetime.datetime.now()
        if duration_type == 'week':
            ago_date = now_date - datetime.timedelta(weeks=1)
        elif duration_type == 'month':
            ago_date = now_date - datetime.timedelta(days=30)
        elif duration_type == 'year':
            ago_date = now_date - datetime.timedelta(days=365)
        else:
            ago_date = datetime.datetime.min
        diaries = Diary.objects.filter(user=user, date__lte=now_date, date__gte=ago_date)
        tags = {}
        for diary in diaries:
            for tag in diary.tag.all():
                if tag.content not in tags:
                    tags[tag.content] = round(diary.duration.hour + diary.duration.minute / 60, 2)
                else:
                    tags[tag.content] += round(diary.duration.hour + diary.duration.minute / 60, 2)
        label = []
        data = []
        for item in sorted(tags.items(), key=lambda kv: kv[1], reverse=True):
            label.append(item[0])
            data.append(item[1])
        return render(request, 'statistic.html', {'data': data, 'label': label})


class Smap(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        return render(request, 'test.html')
