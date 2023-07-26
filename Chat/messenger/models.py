from django.db import models
from django.contrib.auth.models import User


class Message(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    to = models.CharField(max_length=64)

    def __str__(self):
        return f"{self.text}"


class Room(models.Model):
    author = models.ForeignKey(User, related_name='admin', on_delete=models.CASCADE)
    name = models.CharField(max_length=64, unique=True)
    members = models.ManyToManyField(User, through='RoomMembers')

    def __str__(self):
        return f"{self.name}"


class RoomMembers(models.Model):
    user = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.room.name}"
