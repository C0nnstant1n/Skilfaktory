from django.db import models
from django.contrib.auth.models import User


class Avatar(models.Model):
    user = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="avatar/", default='avatar/default_avatar.png')

    def __str__(self):
        return f"{self.avatar}"
