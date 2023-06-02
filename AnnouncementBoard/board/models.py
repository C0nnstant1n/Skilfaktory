from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse
from froala_editor.fields import FroalaField


class Category(models.Model):
    category_name = models.CharField(max_length=32, unique=True)

    def __str__(self):
        return f"{self.category_name}"


class Advert(models.Model):
    date = models.DateTimeField(auto_now_add=True)
    title = models.CharField(max_length=128)
    content = FroalaField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    category = models.ManyToManyField(Category, through='AdvertCategory')

    def __str__(self):
        return f"{self.title[:16]}"

    def get_absolute_url(self):
        return reverse('advert', args=[str(self.pk)])


class AdvertCategory(models.Model):
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE)
    category = models.ForeignKey(Category, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.advert}-{self.category}"
