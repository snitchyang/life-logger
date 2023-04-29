from django.db import models
from django.contrib.auth.models import AbstractUser


class User(AbstractUser):
    biography = models.TextField(blank=True)
    avatar = models.ImageField(upload_to='user/avatars/', default='user/avatars/default.jpg', blank=True)
    school = models.CharField(max_length=255, blank=True)
    phoneNumber = models.CharField(max_length=20, blank=True)
    gender = models.CharField(choices=[('male', 'Male'), ('female', 'Female'), ('others', 'Others')], max_length=10,
                              blank=True)

    def __str__(self):
        return self.username


class Plan(models.Model):
    content = models.TextField()
    due = models.DateTimeField()
    finished = models.BooleanField(default=False)

    def __str__(self):
        return self.content


class Tag(models.Model):
    content = models.CharField(max_length=255)

    def __str__(self):
        return self.content


class Diary(models.Model):
    date = models.DateField()
    title = models.CharField(max_length=255)
    content = models.TextField()
    image = models.ImageField(upload_to='diary/images/', blank=True)
    tag = models.ManyToManyField(Tag, blank=True)

    def __str__(self):
        return self.title


class Post(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    location = models.CharField(max_length=255, blank=True)
    content = models.TextField(blank=False)
    image = models.ImageField(upload_to='post/images/', blank=True)
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    likes = models.PositiveIntegerField(default=0)
    liker = models.ManyToManyField(User, related_name='likePost', blank=True)

    def __str__(self):
        return self.content


class Comment(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    date = models.DateTimeField(auto_now_add=True)
    content = models.TextField()
    post = models.ForeignKey(Post, on_delete=models.CASCADE)

    def __str__(self):
        return self.content


class Friendship(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_user')
    friend = models.ForeignKey(User, on_delete=models.CASCADE, related_name='friendship_friend')

    def __str__(self):
        return f"{self.user} - {self.friend}"
