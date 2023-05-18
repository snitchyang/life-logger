import datetime

from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.views import APIView

from api.models import User, Diary


class Statistic(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        user = User.objects.get(id=1)
        duration_type = request.query_params['duration']
        now_date = datetime.datetime.now()
        if duration_type == 'week':
            ago_date = now_date - datetime.timedelta(weeks=1)
        elif duration_type == 'month':
            ago_date = now_date - datetime.timedelta(days=30)
        elif duration_type == 'year':
            ago_date = now_date - datetime.timedelta(days=365)
        else:
            ago_date = datetime.datetime.min
        diaries = Diary.objects.filter(user=user, date__lte=now_date, date__gte=ago_date)
        tags = {}
        for diary in diaries:
            for tag in diary.tag.all():
                if tag.content not in tags:
                    tags[tag.content] = round(diary.duration.hour + diary.duration.minute / 60, 2)
                else:
                    tags[tag.content] += round(diary.duration.hour + diary.duration.minute / 60, 2)
        label = []
        data = []
        for item in sorted(tags.items(), key=lambda kv: kv[1], reverse=True):
            label.append(item[0])
            data.append(item[1])
        return render(request, 'statistic.html', {'data': data, 'label': label})


class Smap(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        return render(request, 'test.html')
