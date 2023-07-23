from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    text = models.TextField(on_delete=models.CASCADE)
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    to = models.CharField(max_length=128)


class Room(models.Model):
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    name = models.CharField(max_length=128)
    members = models.ForeignKey(User, on_delete=models.CASCADE)