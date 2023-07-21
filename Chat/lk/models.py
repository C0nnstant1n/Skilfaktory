from django.db import models
from django.contrib.auth.models import User


class LkUser(models.Model):
    nick_name = models.OneToOneField(User, on_delete=models.CASCADE)
    avatar = models.ImageField(upload_to="uploads/")

    def __str__(self):
        return f"{self.nick_name}"
