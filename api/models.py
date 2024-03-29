import uuid

from django.contrib.auth.models import AbstractUser
from django.db import models


class User(AbstractUser):
    biography = models.TextField(blank=True, verbose_name='个性签名')
    avatar = models.ImageField(upload_to='avatar/', default='avatar/default.jpg', verbose_name='头像')
    school = models.CharField(max_length=255, blank=True, verbose_name='学校')
    phone_number = models.CharField(max_length=20, blank=True, verbose_name='电话号码')
    gender = models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('others', 'Others')], max_length=10,
                              blank=True, verbose_name='性别')

    def __str__(self):
        return self.username


class Plan(models.Model):
    content = models.TextField(verbose_name='内容')
    due = models.DateTimeField(verbose_name='截止日期')
    finished = models.BooleanField(default=False, verbose_name='完成')
    user = models.ForeignKey(User, related_name='plans', on_delete=models.CASCADE, verbose_name='用户')

    def __str__(self):
        return self.content

    class Meta:
        verbose_name_plural = '计划'


class Tag(models.Model):
    content = models.CharField(max_length=255, verbose_name='内容')

    def __str__(self):
        return self.content

    class Meta:
        verbose_name_plural = '标签'


class Diary(models.Model):
    begin = models.DateTimeField(verbose_name='开始时间', null=True)
    end = models.DateTimeField(verbose_name='结束时间', null=True)
    title = models.CharField(max_length=255, verbose_name='标题')
    content = models.TextField(verbose_name='内容')
    tag = models.ManyToManyField(Tag, related_name='diaries', blank=True, verbose_name='标签')
    user = models.ForeignKey(User, related_name='diaries', on_delete=models.CASCADE, verbose_name='用户')

    def duration(self):
        return self.end.date() - self.begin.date()

    def __str__(self):
        return self.title

    class Meta:
        verbose_name_plural = '日记'
        ordering = ['begin']


class Post(models.Model):
    date = models.DateTimeField(auto_now_add=True, verbose_name='日期')
    location = models.CharField(max_length=255, blank=True, verbose_name='位置')
    content = models.TextField(blank=False, verbose_name='内容')
    user = models.ForeignKey(User, related_name='posts', on_delete=models.CASCADE, verbose_name='发表用户')
    likes = models.PositiveIntegerField(default=0, verbose_name='点赞数')
    liker = models.ManyToManyField(User, related_name='like_posts', blank=True, verbose_name='点赞用户')

    def __str__(self):
        return self.content

    class Meta:
        verbose_name_plural = '帖子'
        ordering = ['-date']


class Comment(models.Model):
    user = models.ForeignKey(User, related_name='comments', on_delete=models.CASCADE, verbose_name='用户')
    date = models.DateTimeField(auto_now_add=True, verbose_name='日期')
    content = models.TextField(verbose_name='内容')
    post = models.ForeignKey(Post, related_name='comments', on_delete=models.CASCADE, verbose_name='帖子')

    def __str__(self):
        return self.content

    class Meta:
        verbose_name_plural = '评论'
        ordering = ['date']


class Friendship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_user', verbose_name='用户')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_friend', verbose_name='朋友')

    def __str__(self):
        return f"{self.user} - {self.friend}"

    class Meta:
        verbose_name_plural = '朋友关系'


class PostImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    path = models.ImageField(upload_to='image/post/', verbose_name='路径')
    post = models.ForeignKey(Post, on_delete=models.CASCADE, related_name='images', verbose_name='帖子')

    def __str__(self):
        return self.path.url

    class Meta:
        verbose_name_plural = '帖子图片'


class DiaryImage(models.Model):
    id = models.UUIDField(primary_key=True, default=uuid.uuid4, editable=False)
    path = models.ImageField(upload_to='image/diary/', verbose_name='路径')
    diary = models.ForeignKey(Diary, on_delete=models.CASCADE, related_name='images', verbose_name='日记')

    def __str__(self):
        return self.path.url

    class Meta:
        verbose_name_plural = '日记图片'
