from django.urls import path
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

from .views import *

urlpatterns = [
    path('', api_root, name='api-root'),

    # path('users', UserList.as_view(), name='user-list'),
    # path('user/<int:pk>', UserDetail.as_view(), name='user-detail'),
    path('user/friends', UserFriends.as_view(), name='user-friends'),
    path('user/self', UserSelf.as_view(), name='user-self'),

    path('friends/search',SearchFriends.as_view(),name='search-friends'),

    path('plans', PlanList.as_view(), name='plan-list'),
    # path('plan/<int:pk>', PlanDetail.as_view(), name='plan-detail'),
    path('plan/add', PlanAdd.as_view(), name='plan-add'),

    path('tags', TagList.as_view(), name='tag-list'),
    # path('tag/<int:pk>', TagDetail.as_view(), name='tag-detail'),

    path('diaries', DiaryList.as_view(), name='diary-list'),
    # path('diary/<int:pk>', DiaryDetail.as_view(), name='diary-detail'),
    path('diary/add', DiaryAdd.as_view(), name='diary-add'),
    path('diary/image/add', DiaryImageDetail.as_view(), name='diary-image-add'),

    # path('comments', CommentList.as_view(), name='comment-list'),
    # path('comment/<int:pk>', CommentDetail.as_view(), name='comment-detail'),
    path('comment/add', CommentAdd.as_view(), name='comment-add'),

    path('posts', PostList.as_view(), name='post-list'),
    path('post/<int:pk>', PostDetail.as_view(), name='post-detail'),
    path('post/like', PostLike.as_view(), name='post-add'),
    path('post/add', PostAdd.as_view(), name='post-add'),
    path('post/image/add', PostImageAdd.as_view(), name='post-image-add'),

    path('auth/token', TokenObtainPairView.as_view(), name='token'),
    path('auth/token/refresh', TokenRefreshView.as_view(), name='refresh'),
    path('login', UserLoginView.as_view(), name='user-login'),
    path('register', UserRegistrationView.as_view(), name='user-registration'),
    path('forget', ForgotPasswordView.as_view(), name='forgot-password'),

    path('statistic', statistic.as_view(), name='statistic'),
    path('map', smap.as_view(), name='smap')
]
