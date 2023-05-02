import datetime

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
from .models import User, Plan, Tag, Diary, Comment, Post, Friendship
from .serializers import UserSerializer, PlanSerializer, TagSerializer, DiarySerializer, CommentSerializer, \
    PostSerializer, FriendshipSerializer


@api_view(['GET'])
def api_root(request):
    return Response({
        'users': reverse('user-list'),
        'plans': reverse('plan-list'),
        'tags': reverse('tag-list'),
        'diaries': reverse('diary-list'),
        'comments': reverse('comment-list'),
        'posts': reverse('post-list'),
        'friendships': reverse('friendship-list'),
    })


class UserList(generics.ListCreateAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = User.objects.all()
    serializer_class = UserSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlanList(APIView):
    queryset = Plan.objects.all().order_by('-due')
    serializer_class = PlanSerializer
    paginate_by = 10
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PlanDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Plan.objects.all()
    serializer_class = PlanSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagList(generics.ListCreateAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class TagDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Tag.objects.all()
    serializer_class = TagSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DiaryList(generics.ListAPIView):
    queryset = Diary.objects.all().order_by('-date')
    serializer_class = DiarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Diary.objects.all()
    serializer_class = DiarySerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentList(generics.ListAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class CommentDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Comment.objects.all()
    serializer_class = CommentSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class PostList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        queryset = Post.objects.all().order_by('-date')
        paginator = Paginator(queryset, 10)
        page = paginator.page(request.query_params['page'])
        posts = PostSerializer(page, many=True)
        return Response(posts.data, status=200)


class PostDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Post.objects.all()
    serializer_class = PostSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class FriendshipList(generics.ListCreateAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class FriendshipDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = Friendship.objects.all()
    serializer_class = FriendshipSerializer
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]


class UserLoginView(APIView):
    permission_classes = [AllowAny]

    def post(self, request):
        username = request.data.get('username')
        password = request.data.get('password')

        user = authenticate(username=username, password=password)
        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            user.last_login = datetime.datetime.now()
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
        phoneNumber = request.data.get('phoneNumber')
        User.objects.create_user(username=username, password=password
                                 , email=email, gender=gender, avatar=avatar, school=school, phoneNumber=phoneNumber
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
