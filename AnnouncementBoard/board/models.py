from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from froala_editor.fields import FroalaField


class Category(models.Model):
    category_name = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return f"{self.category_name}"


class Author(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.user}"


class Advert(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    text = FroalaField()
    author = models.ForeignKey(Author, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, through='AdvertCategory')

    def __str__(self):
        return f"{self.title[:16]}"

    def get_absolute_url(self):
        return reverse('post', args=[str(self.pk)])


class AdvertCategory(models.Model):
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.post}-{self.category}"
