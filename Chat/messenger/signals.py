from django.db.models.signals import post_save
from django.dispatch import receiver
from .models import Room, RoomMembers, User


@receiver(post_save, sender=Room)
def user_created(instance, **kwargs):
    if kwargs['created']:
        room_members_1 = RoomMembers.objects.create(
            member=instance.author, room=instance
        )

        members = set(RoomMembers.objects.filter(room=instance)
                      .values_list("member__username"))
        for m in members:
            if instance.name not in m:
                room_members_2 = RoomMembers.objects.create(
                    member=User.objects.get(username=instance.name),
                    room=Room.objects.get(name=instance)
                )
