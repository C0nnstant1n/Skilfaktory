from django.db import models
from django.contrib.auth.models import User
from datetime import datetime


class Author(models.Model):
    author_rate = models.IntegerField(default=0)
    user = models.ForeignKey(User, on_delete=models.CASCADE)


class Category(models.Model):
    category_name = models.CharField(max_length=15, unique=True)


class Post(models.Model):
    article = 'AR'
    news = 'NE'
    TYPE = [(article, 'Статья'), (news, 'Новость')]
    type = models.CharField(max_length=2, choices=TYPE, default=news)
    post_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=100)
    post_text = models.TextField()
    post_rate = models.IntegerField(default=0)
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, through='PostCategory')

    def like(self):
        self.post_rate += 1
        self.save()

    def dislike(self):
        self.post_rate -= 1
        self.save()


class PostCategory(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Comment(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    text_comment = models.CharField(max_length=255)
    rate_comment = models.IntegerField(default=0)
    post = models.ForeignKey(Post)
    user_comment = models.ForeignKey(User)

    def like(self):
        self.rate_comment += 1
        self.save()

    def dislike(self):
        self.rate_comment -= 1
        self.save()
