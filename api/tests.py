import datetime

from django.contrib.auth.hashers import make_password
from django.test import TestCase

from api.models import *


# Create your tests here.
class PostModelTest(TestCase):
    def setUp(self):
        self.user = User.objects.create_user(username="username", password=make_password("password"))
        self.post = Post.objects.create(date=datetime.datetime.now(), user=self.user, location="上海市",
                                        content="测试内容",
                                        likes=0)
        self.comment = Comment.objects.create(post=self.post, content="测试内容", date=datetime.datetime.now(),
                                              user=self.user)

    def test_str_representation(self):
        self.assertEqual(self.post.__str__(), self.post.content)

    def test_likes_is_positive_number(self):
        self.assertTrue(self.post.likes >= 0)

    def test_delete(self):
        self.assertIsNotNone(self.post)
        Post.objects.get(id=self.post.pk).delete()
        self.assertFalse(Post.objects.contains(self.post))

    def test_modified_time(self):
        self.assertIsNotNone(self.post.date)
        old_post_modified_date = self.post.date
        self.post.content = '新的测试内容'
        self.post.date = datetime.datetime.now()
        self.post.save()
        self.post.refresh_from_db()
        self.assertTrue(self.post.date > old_post_modified_date)

    def test_liker(self):
        self.post.liker.add(self.user)
        self.post.save()
        self.post.refresh_from_db()
        self.assertTrue(self.post.liker.contains(self.user))

    def test_post_comment(self):
        self.assertTrue(self.post.comments.contains(self.comment))
        comment = self.comment
        self.post.comments.get(id=self.comment.pk).delete()
        self.post.save()
        self.post.refresh_from_db()
        self.assertFalse(self.post.comments.contains(comment))
