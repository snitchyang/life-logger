from rest_framework import generics, permissions
from rest_framework.request import Request
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Comment
from api.serializers import CommentSerializer


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
        user = request.user
        data = request.data
        content = data.get('content')
        post_id = data.get('post')
        Comment.objects.create(post_id=post_id, content=content, user=user)
        return Response({'message': 'success'}, status=200)
