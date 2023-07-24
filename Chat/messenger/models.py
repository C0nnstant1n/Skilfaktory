from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    text = models.TextField()
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    to = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.text}"


class Room(models.Model):
    name = models.CharField(max_length=64)
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    members = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.name}"
