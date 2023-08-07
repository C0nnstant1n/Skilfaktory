from django.db import models
from django.contrib.auth.models import User


class Room(models.Model):
    author = models.ForeignKey(User, related_name='admin', on_delete=models.CASCADE)
    name = models.CharField(max_length=64, unique=False)
    members = models.ManyToManyField(User, through='RoomMembers')

    def __str__(self):
        return f"{self.name}"


class Message(models.Model):
    text = models.TextField()
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    target = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.target}"


class RoomMembers(models.Model):
    member = models.ForeignKey(User, on_delete=models.CASCADE)
    room = models.ForeignKey(Room, on_delete=models.CASCADE)

    def __str__(self):
        return f"{self.room.name}"
