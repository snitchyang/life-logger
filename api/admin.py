from django.contrib import admin

from .models import *


@admin.register(User)
class UserAdmin(admin.ModelAdmin):
    list_display = (
        'username', 'last_login', 'school', 'phone_number', 'email', 'gender', 'is_active', 'is_superuser',)
    list_filter = ('gender', 'last_login', 'is_active', 'is_superuser')
    search_fields = ('username', 'school', 'phone_number', 'email',)


@admin.register(Diary)
class DiaryAdmin(admin.ModelAdmin):
    list_display = ('title', 'content', 'begin', 'end')
    list_filter = ('tag', 'begin', 'end')
    search_fields = ('title', 'user')


@admin.register(Tag)
class TagAdmin(admin.ModelAdmin):
    list_display = ('id', 'content',)
    list_display_links = ('id',)
    list_editable = ('content',)
    # search_fields = ('content',)


@admin.register(Plan)
class PlanAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'due', 'finished')
    list_filter = ('due', 'finished')
    search_fields = ('content', 'user')


@admin.register(Comment)
class CommentAdmin(admin.ModelAdmin):
    list_display = ('content', 'post', 'user', 'date',)
    list_filter = ('user',)
    search_fields = ('content',)


@admin.register(Post)
class PostAdmin(admin.ModelAdmin):
    list_display = ('user', 'content', 'date', 'likes', 'location')
    list_filter = ('date',)
    search_fields = ('content', 'user')


@admin.register(Friendship)
class FriendshipAdmin(admin.ModelAdmin):
    list_display = ('user', 'friend')
    search_fields = ('user',)


@admin.register(DiaryImage)
class DiaryImageAdmin(admin.ModelAdmin):
    list_display = ('path', 'diary')
    search_fields = ('path', 'diary')


@admin.register(PostImage)
class PostImageAdmin(admin.ModelAdmin):
    list_display = ('path', 'post')
    search_fields = ('path', 'post')
