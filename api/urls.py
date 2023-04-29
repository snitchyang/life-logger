from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import *
from rest_framework.authtoken.views import obtain_auth_token

urlpatterns = [
    path('', api_root, name='api-root'),

    path('users', UserList.as_view(), name='user-list'),
    path('users/<int:pk>', UserDetail.as_view(), name='user-detail'),

    path('plans', PlanList.as_view(), name='plan-list'),
    path('plans/<int:pk>', PlanDetail.as_view(), name='plan-detail'),

    path('tags', TagList.as_view(), name='tag-list'),
    path('tags/<int:pk>', TagDetail.as_view(), name='tag-detail'),

    path('diaries', DiaryList.as_view(), name='diary-list'),
    path('diaries/<int:pk>', DiaryDetail.as_view(), name='diary-detail'),

    path('comments', CommentList.as_view(), name='comment-list'),
    path('comments/<int:pk>', CommentDetail.as_view(), name='comment-detail'),

    path('posts', PostList.as_view(), name='post-list'),
    path('posts/<int:pk>', PostDetail.as_view(), name='post-detail'),
    path('posts/<int:pk>/like', like_post, name='like-post'),

    path('friendships', FriendshipList.as_view(), name='friendship-list'),
    path('friendships/<int:pk>', FriendshipDetail.as_view(), name='friendship-detail'),

    path('auth/token', TokenObtainPairView.as_view(), name='token'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('login', UserLoginView.as_view(), name='user_login'),
    path('register', UserRegistrationView.as_view(), name='user_registration'),
    path('forget', ForgotPasswordView.as_view(), name='forgot_password'),
]
