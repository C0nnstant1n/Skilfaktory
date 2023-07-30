from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Room, RoomMembers


@receiver(post_save, sender=Room)
def user_created(instance, **kwargs):
    if kwargs['created']:
        room_members = RoomMembers.objects.create(member=instance.author, room=instance)
        print(room_members)
