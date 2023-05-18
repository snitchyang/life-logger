from django.urls import reverse
from rest_framework.decorators import api_view
from rest_framework.response import Response


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
