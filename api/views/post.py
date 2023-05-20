import base64
import math
import os

from django.core.paginator import Paginator
from django.http import HttpRequest
from rest_framework import permissions, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import *
from api.serializers import PostSerializer
from lifelogger import settings


def make_image_url(path, request):
    return "http://" + request.get_host() + path


class PostList(APIView):
    permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def get(self, request: Request):
        user = request.user
        friends = [friendship.friend for friendship in Friendship.objects.filter(user=user).all()]
        friends += [user]
        queryset = Post.objects.filter(user__in=friends)
        queryset_len = len(queryset)
        page_size = math.ceil(queryset_len / 6)
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
        image: [str] = data.get('image')
        image = [i[i.find('/media/') + len('/media/'):] for i in image]
        user = request.user
        post: Post = Post.objects.create(location=location, content=content, user=user)
        image_objects = [PostImage(path=url, post=post) for url in image]
        post.images.bulk_create(image_objects)
        return Response({'post': post.id, 'message': 'success', 'success': True}, status=200)


class PostLike(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request: Request):
        data = request.data
        post_id = data.get('post')
        like = data.get('like')
        user = request.user
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

    def post(self, request: HttpRequest):
        image = request.data.get('image')
        if image is None:
            return Response({'message': 'lack data', 'success': False}, status=200)
        uid = uuid.uuid1()
        database_path = 'image/post/' + str(uid) + '.jpg'
        media_path = make_image_url(settings.MEDIA_URL + database_path, request)
        img_path = os.path.join(settings.MEDIA_ROOT, database_path)
        with open(img_path, 'wb') as out:
            out.write(base64.b64decode(image))
            out.flush()
        return Response({'message': 'success', 'success': True, 'url': media_path}, status=200)
