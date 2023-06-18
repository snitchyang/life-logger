import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models
from api.models import *
import math
import random
import numpy as np
import pandas as pd
import jieba.analyse

from api.serializers import PostSerializer


def splitcomments(user):
    queryset = Post.object.all()
    userset = PostSerializer(
        Post.objects.filter(user=user).select_related('user').prefetch_related('tag'))
    anotherset = queryset - userset
    return userset,anotherset
def maketokenlist(set):
    '''选取出现频次最高的5个关键词,进行关键词库构建'''
    topK = 10
    jieba.enable_paddle()# 启动paddle模式。 0.40版之后开始支持，早期版本不支持
    tokenlist = []
    #提取user点赞项目中的所有中文token
    for i in range(userset) :
        str = userset[i]
        tags = jieba.analyse.extract_tags(content, topK=topK)
        tokenlist.insert(tags)
    return tokenlist
def predict_to_data_frame(model: LatentDirichletAllocation, X: np.ndarray) -> pd.DataFrame:
    '''
    求出题概率分布情况

    Parameters
    ----------
    model : sklearn 的 LatentDirichletAllocation
    X : 词向量矩阵

    Return
    ------
    DataFrame: 包含主题词分布情况
    '''
    matrix = model.transform(X)
    columns = [f'P(topic word {i+1})' for i in range(len(model.components_))]
    df = pd.DataFrame(matrix, columns=columns)
    return df
# 使用jieba的搜索引擎模式分词
def split_words(words):
    word_list = jieba.cut_for_search(words.lower().strip(),HMM=True) # 转小写，去空格，加新词发现
    word_list = [i for i in word_list if i not in stopwords and i!=' ']  # 去停用词
    return word_list
# 统计词频（每个词在该文档中出现的频率，也就是tf值，为后面计算tf_idf做准备），并返回字典
def make_word_freq(word_list,str):
    freword = {}
    for i in word_list:
        if str(i) in freword:
            freword[str(i)] += 1
        else:
            freword[str(i)] = 1
    return freword
# 基于numpy的余弦相似性计算
def Cos_Distance(vector1, vector2):
    vec1 = np.array(vector1)
    vec2 = np.array(vector2)
    return float(np.sum(vec1 * vec2)) / (np.linalg.norm(vec1) * np.linalg.norm(vec2)) # 余弦相似度的计算公式，不会的百度
# 计算文件与喜欢的tag的相似度
def similarity_words(vec, vecs_list):
    Similarity_list = []
    for vec_i in vecs_list: # vecs_list是所有标题的tf-idf值，用来和要搜索的标题做比较，看相似
        Similarity = Cos_Distance(vec, vec_i)
        Similarity_list.append(Similarity)
    return Similarity_list

def PostRecommand(user):
    base,new = splitcomments(user)
    idfs = []
    all_base = maketokenlist(base)
    for i in range(new):
        word_list = split_words(new[i])
        idfs = make_word_freq(maketokenlist(base),word_list)

    vec = make_tfidf(word_list, all_base, idfs)
    similarity_lists = similarity_words(vec, vecs_list)
    resultlist = sorted(enumerate(similarity_lists), key=lambda x: x[1]) # 按相似度排序
    return resultlist


