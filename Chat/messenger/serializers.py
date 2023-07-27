from .models import Message, Room, User, RoomMembers
from rest_framework import serializers


class CurrentUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class UsersSerializer(serializers.HyperlinkedModelSerializer):
    username = serializers.PrimaryKeyRelatedField(read_only=True)

    class Meta:
        model = User
        fields = ['id', 'username']


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = Message
        fields = ['id', 'text', 'to', 'author']


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    members = serializers.SlugRelatedField(read_only=True, many=True, slug_field='username')

    class Meta:
        model = Room
        fields = ['id', 'author', 'name', 'members']


class RoomMembersSerializer(serializers.HyperlinkedModelSerializer):
    room = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='name')
    user = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')

    class Meta:
        model = RoomMembers
        fields = ['id', 'room', 'user']
