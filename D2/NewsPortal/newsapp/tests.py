# from django.test import TestCase
#
# # Create your tests here.
from .models import Post


def my_job():
    posts_week = Post.objects.filter(post_date__lt=7)
    return posts_week
