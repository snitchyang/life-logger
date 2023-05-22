import json
import uuid
import base64
import os
from django.core.paginator import Paginator
from django.http import HttpRequest
from rest_framework import permissions, generics
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Diary, DiaryImage, Tag
from api.serializers import DiarySerializer
from lifelogger import settings

from .post import make_image_url


class DiaryList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = request.user
        diaries = DiarySerializer(Diary.objects.filter(user=user).order_by('-date'), many=True,
                                  context={'request': request}).data
        return Response(diaries, status=200)


class DiaryImageDetail(APIView):
    permission_classes = [permissions.AllowAny]

    permission_classes = [permissions.AllowAny]

    def post(self, request: HttpRequest):
        image = request.data.get('image')
        if image is None:
            return Response({'message': 'lack data', 'success': False}, status=200)
        uid = uuid.uuid1()
        database_path = 'image/diary/' + str(uid) + '.jpg'
        media_path = make_image_url(settings.MEDIA_URL + database_path, request)
        img_path = os.path.join(settings.MEDIA_ROOT, database_path)
        with open(img_path, 'wb') as out:
            out.write(base64.b64decode(image))
            out.flush()
        return Response({'message': 'success', 'success': True, 'url': media_path}, status=200)


class DiaryAdd(APIView):
    # permission_classes = [permissions.IsAuthenticatedOrReadOnly]

    def post(self, request: Request):
        user = request.user
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
# class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Diary.objects.all()
#     serializer_class = DiarySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
