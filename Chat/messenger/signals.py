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
        print(instance)
        print(members)
        for m in members:
            print(m)
            if instance.name not in m:
                print('yes')
                room_members_2 = RoomMembers.objects.create(
                    member=User.objects.get(username=instance.name),
                    room=Room.objects.get(name=instance)
                )
                print(room_members_2)

        print(room_members_1)
