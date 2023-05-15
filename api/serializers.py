from rest_framework import serializers

from .models import *


class UserSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ['id', 'avatar', 'biography', 'phone_number', 'email', 'school', 'last_login', 'username', 'gender',
                  'is_superuser']


class UserHeaderSerializer(serializers.ModelSerializer):
    avatar = serializers.ImageField(use_url=True)

    class Meta:
        model = User
        fields = ('id', 'username', 'avatar')


class PostImageSerializer(serializers.ModelSerializer):
    path = serializers.ImageField(use_url=True)

    class Meta:
        model = PostImage
        fields = ['path', ]


class DiaryImageSerializer(serializers.ModelSerializer):
    path = serializers.ImageField(use_url=True)

    class Meta:
        model = DiaryImage
        fields = ['path', ]


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['id', 'content', ]


class DiarySerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)
    images = DiaryImageSerializer(many=True)

    class Meta:
        model = Diary
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserHeaderSerializer()

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user = UserHeaderSerializer()
    comments = CommentSerializer(many=True)
    images = PostImageSerializer(many=True)

    class Meta:
        model = Post
        fields = ['id', 'user', 'comments', 'images', 'date', 'location', 'content', 'likes', 'liker']


class FriendshipSerializer(serializers.ModelSerializer):
    friend = serializers.StringRelatedField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']
