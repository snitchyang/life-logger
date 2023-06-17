import base64
import os
import uuid

from django.http import HttpRequest
from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Diary, Tag, DiaryImage
from api.serializers import DiarySerializer
from lifelogger import settings
from .post import make_image_url


class DiaryList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = request.user

        diaries = DiarySerializer(
            Diary.objects.filter(user=user).select_related('user').prefetch_related('tag').prefetch_related(
                'images').order_by('-end'), many=True,
            context={'request': request}).data
        return Response(diaries, status=200)


class DiaryImageDetail(APIView):
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
        tag_id = data.get('tags')
        begin = data.get('begin')
        end = data.get('end')
        image = data.get('imgs')
        image = [i[i.find('/media/') + len('/media/'):] for i in image]
        diary = Diary.objects.create(title=title, content=content, user=user, begin=begin, end=end)
        image_objects = [DiaryImage(path=url, diary=diary) for url in image]
        diary.images.bulk_create(image_objects)
        for _ in tag_id:
            diary.tag.add(_)
        diary.save()
        return Response({'message': 'success', 'success': True}, status=200)

    def put(self, request: Request):
        data = request.data
        id = data.get('id')
        title = data.get('title')
        content = data.get('content')
        tag_id = request.data.get('tag')
        diary = Diary.objects.get(id=id)
        diary.title = title
        diary.content = content
        diary.tag.clear()
        diary.tag.bulk_create(Tag.objects.filter(pk__in=tag_id))
        diary.save()
        return Response({'message': 'success'}, status=200)
# class DiaryDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Diary.objects.all()
#     serializer_class = DiarySerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
