import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from api.models import *
import math
import random
import numpy as np
import pandas as pd
# from Utils import modelsave
from collections import defaultdict
from operator import itemgetter
import jieba
from operator import itemgetter
from api.serializers import DiarySerializer



# 存储映射表所对应的地址名字
Map = [
    '北京市','天津省','河北省','山西省','内蒙古自治区','辽宁省','吉林省','黑龙江省',
    '上海市','江苏省','浙江省','安徽省','福建省','江西省','山东省','河南省','湖北省','湖南省',
    '广东省','广西省','海南省','重庆市','四川省','贵州省','云南省','西藏自治区','陕西省','甘肃省',
    '青海省','宁夏回族自治区','新疆维吾尔自治区','台湾省','香港特别行政区','澳门特别行政区'
]
def readweight(user):
    x = user
    result = [i for i in range(len(Map)) if Map[i] == x]
    # 截取出所需要的一行数据
    row = pd.read_table("./templates/DistanceWeightMap.xlsx")[result]
    return row


def cos_sim(x,y):
    '''余弦相似性
    x(mat)：以行向量存储，可以是用户或者是商品
    y(nat)：以行向量存储，可以是用户或者商品
    '''
    numerator = x*y.T
    denominator = np.sqrt(x * x.T) * np.sqrt(y * y.T)
    return (numerator / denominator)[0, 0]
def LoadUsersData(user):
    trainData = dict()
    user = User.objects.all()
    w = readweight(user)
    weight = []
    for i in range(user):
        user = int(user.id)
        diariesdata = DiarySerializer(
        Diary.objects.filter(user=user).select_related('user').prefetch_related('tag'))
        n = [i for i in range(len(Map)) if Map[i] == user]
        weight.setdefault(set())
        weight.add()
        '''
        建立User-Tag表，结构如下：
            {"User1": {TagID1, TagID2, TagID3,...}
              "User2": {TagID4, TagID5, TagID6,...}'''
        for tag in diariesdata:
            trainData.setdefault(user, set())
            trainData[user].add(tag)
        return trainData
def similarity(data):
    '''计算矩阵中任意两行之间的相似度
    input:  data(mat):任意矩阵
    output: w(mat):任意两行之间的相似度
    '''
    m = np.shape(data)[0]  # 用户的数量
    # 初始化相似度矩阵
    w = np.mat(np.zeros((m, m)))

    for i in range(m):
        for j in range(i, m):
            if j != i:
                # 计算任意两行之间的相似度
                w[i, j] = cos_sim(data[i,], data[j,])
                w[j, i] = w[i, j]
            else:
                w[i, j] = 0
    return w
def tagbasedrecommend(user):
    w = readweight(user)
    w_data = similarity(LoadUsersData(user))
    resultlist = []
    for i in range(w_data):
        resultlist = w_data[i]*w[[i for i in range(len(Map)) if Map[i] == User.objects.filter(user=user).select_related('id')]]
    return sorted(resultlist.items(), itemgetter(1), True)[:10]





