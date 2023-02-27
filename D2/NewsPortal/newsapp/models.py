from django.db import models
from django.contrib.auth.models import User
# from datetime import datetime


class Author(models.Model):
    author_rate = models.IntegerField(default=0)
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def update_rating(self):
        self.author_rate = 0
        # Получаем рейтинг статьи
        posts = Post.objects.filter(author=self.id).values("post_rate")
        for _ in posts:
            self.author_rate += _.get("post_rate")
        self.author_rate *= 3

        # получаем рейтинг комментариев к статьям, делаем отдельно, т.к. количество статей и коментариев
        # к ним может различаться
        posts = Post.objects.filter(author=self.id).values('comment__rate_comment')
        for _i in posts:
            self.author_rate += _i.get('comment__rate_comment')

        # рейтинг комментариев автора
        comments = Comment.objects.filter(user_comment=self.user.id).values('rate_comment')
        for _k in comments:
            self.author_rate += _k.get('rate_comment')
        self.save()


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

    def preview(self):
        return self.post_text[:124] + '...'


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
