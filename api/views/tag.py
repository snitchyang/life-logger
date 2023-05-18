from rest_framework import permissions
from rest_framework.response import Response
from rest_framework.views import APIView

from api.models import Tag
from api.serializers import TagSerializer


class TagList(APIView):
    permission_classes = [permissions.AllowAny]

    def get(self, request):
        response = TagSerializer(Tag.objects.all(), many=True).data
        return Response(response, status=200)
# class TagDetail(generics.RetrieveUpdateDestroyAPIView):
#     queryset = Tag.objects.all()
#     serializer_class = TagSerializer
#     permission_classes = [permissions.IsAuthenticatedOrReadOnly]
