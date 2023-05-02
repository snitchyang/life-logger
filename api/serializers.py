from rest_framework import serializers

from .models import User, Plan, Tag, Diary, Comment, Post, Friendship


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'avatar', 'biography', 'phone_number', 'email', 'school', 'last_login', 'username',
                  'is_superuser']


class UserHeaderSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = ['content', ]


class DiarySerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)

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

    class Meta:
        model = Post
        fields = '__all__'


class FriendshipSerializer(serializers.ModelSerializer):
    friend = serializers.StringRelatedField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']
