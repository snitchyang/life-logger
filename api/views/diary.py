import json

from rest_framework import permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Diary, DiaryImage, Tag
from api.serializers import DiarySerializer


class DiaryList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request: Request):
        user = request.user
        diaries = DiarySerializer(Diary.objects.filter(user=user).order_by('-date'), many=True,
                                  context={'request': request}).data
        return Response(diaries, status=200)


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
