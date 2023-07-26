from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import User, Avatar


@receiver(post_save, sender=User)
def user_created(instance, **kwargs):
    if kwargs['created']:
        avatar = Avatar.objects.create(user=instance)
        print(avatar)
