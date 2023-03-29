from django.contrib import admin
from .models import User, Plan, Tag, Diary, Comment, Post, Friendship

admin.site.register(User)
admin.site.register(Plan)
admin.site.register(Tag)


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('title', 'date')
    list_filter = ('tag',)
    search_fields = ('title', 'content')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('post', 'user', 'date')
    list_filter = ('user',)
    search_fields = ('content',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('content', 'user', 'date', 'likes')
    list_filter = ('user', 'date')
    search_fields = ('content',)


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend')
