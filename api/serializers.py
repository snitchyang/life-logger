from rest_framework import serializers
from .models import User, Plan, Tag, Diary, Comment, Post, Friendship


class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ['id', 'username', 'first_name', 'last_name', 'email', 'biography', 'avatar', 'school', 'phoneNumber',
                  'gender']


class PlanSerializer(serializers.ModelSerializer):
    class Meta:
        model = Plan
        fields = '__all__'


class TagSerializer(serializers.ModelSerializer):
    class Meta:
        model = Tag
        fields = '__all__'


class DiarySerializer(serializers.ModelSerializer):
    tag = TagSerializer(many=True)

    class Meta:
        model = Diary
        fields = '__all__'


class CommentSerializer(serializers.ModelSerializer):
    user = UserSerializer()

    class Meta:
        model = Comment
        fields = '__all__'


class PostSerializer(serializers.ModelSerializer):
    user = UserSerializer()
    comments = CommentSerializer(many=True)

    class Meta:
        model = Post
        fields = '__all__'


class FriendshipSerializer(serializers.ModelSerializer):
    friend = serializers.StringRelatedField()

    class Meta:
        model = Friendship
        fields = ['id', 'friend']
