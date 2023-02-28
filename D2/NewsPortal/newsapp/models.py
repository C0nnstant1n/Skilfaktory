from django.db import models
from django.contrib.auth.models import User
from django.db.models import Sum


# from datetime import datetime


class Author(models.Model):
    author_rate = models.SmallIntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def update_rating(self):
        self.author_rate = 0
        # Получаем рейтинг статьи
        posts_rate = self.post_set.aggregate(post_raiting=Sum('post_rate'))
        rating_posts = posts_rate.get('post_raiting')

        # получаем рейтинг комментариев автора
        comments = self.user.comment_set.aggregate(comment_rate=Sum('rate_comment'))
        rating_comments = comments.get('comment_rate')

        # получаем статьи автора и все коменнтарии к ним, считаем рейтинг всех комментариев
        comments_posts_rates = (
            Comment.objects.filter(post__author__user=self.user).aggregate(rate_comments_posts=Sum('rate_comment'))
        )
        rating_comments_posts = comments_posts_rates.get('rate_comments_posts')

        self.author_rate = rating_posts * 3 + rating_comments + rating_comments_posts
        self.save()


class Category(models.Model):
    category_name = models.CharField(max_length=16, unique=True)


class Post(models.Model):
    article = 'AR'
    news = 'NE'
    TYPE = ((article, 'Статья'), (news, 'Новость'))
    type = models.CharField(max_length=2, choices=TYPE, default=news)
    post_date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
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

    def preview(self):
        return f"{self.post_text[:124]}..."


class PostCategory(models.Model):
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)


class Comment(models.Model):
    time = models.DateTimeField(auto_now_add=True)
    text_comment = models.CharField(max_length=255)
    rate_comment = models.IntegerField(default=0)
    post = models.ForeignKey(Post, on_delete=models.CASCADE)
    user_comment = models.ForeignKey(User, on_delete=models.CASCADE)

    def like(self):
        self.rate_comment += 1
        self.save()

    def dislike(self):
        self.rate_comment -= 1
        self.save()
