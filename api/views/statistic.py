import collections
import datetime
import itertools
from typing import Final

from django.shortcuts import render
from rest_framework.permissions import AllowAny
from rest_framework.request import Request
from rest_framework.views import APIView

from api.models import Diary, Post


class Statistic(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        user = request.user
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
        diaries = Diary.objects.filter(user=user, end__lte=now_date, end__gte=ago_date)
        tags = {}
        for diary in diaries:
            for tag in diary.tag.all():
                duration = diary.end - diary.begin
                if tag.content not in tags:
                    tags[tag.content] = round(duration.seconds / 3600, 2)
                else:
                    tags[tag.content] += round(duration.seconds / 3600, 2)
        label = []
        data = []
        for item in sorted(tags.items(), key=lambda kv: kv[1], reverse=True):
            label.append(item[0])
            data.append(item[1])
        return render(request, 'statistic.html', {'data': data, 'label': label})


adcodes: Final = {
    "全国": 100000,
    "北京市": 110000,
    "天津市": 120000,
    "河北省": 130000,
    "山西省": 140000,
    "内蒙古自治区": 150000,
    "辽宁省": 210000,
    "吉林省": 220000,
    "黑龙江省": 230000,
    "上海市": 310000,
    "江苏省": 320000,
    "浙江省": 330000,
    "安徽省": 340000,
    "福建省": 350000,
    "江西省": 360000,
    "山东省": 370000,
    "河南省": 410000,
    "湖北省": 420000,
    "湖南省": 430000,
    "广东省": 440000,
    "广西壮族自治区": 450000,
    "海南省": 460000,
    "重庆市": 500000,
    "四川省": 510000,
    "贵州省": 520000,
    "云南省": 530000,
    "西藏自治区": 540000,
    "陕西省": 610000,
    "甘肃省": 620000,
    "青海省": 630000,
    "宁夏回族自治区": 640000,
    "新疆维吾尔自治区": 650000,
    "台湾省": 710000,
    "香港特别行政区": 810000,
    "澳门特别行政区": 820000
}


class Smap(APIView):
    permission_classes = [AllowAny]

    def get(self, request: Request):
        user = request.user
        locations = Post.objects.filter(user=user).exclude(location__in=['', '局域网']).values_list('location')
        locations_list = itertools.chain.from_iterable(locations)
        province_list = [location.split()[0] for location in locations_list]
        province_count = collections.Counter(province_list)
        sum = 0
        for value in province_count.values():
            sum += value
        data_ancodes = []
        data_colors = dict()
        for key, value in province_count.items():
            data_ancodes.append(adcodes[key])
            data_colors[adcodes[key]] = 'rgb({},{},255)'.format(255 * (sum - value) / sum, 255 * (sum - value) / sum)
        return render(request, 'map.html', {'data_ancodes': data_ancodes, 'data_colors': data_colors})
