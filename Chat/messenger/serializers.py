from .models import Message, Room, User, RoomMembers
from rest_framework import serializers
from rest_framework.validators import UniqueTogetherValidator


class CurrentUserSerializer(serializers.ModelSerializer):

    class Meta:
        model = User
        fields = ['id', 'username']


class UsersSerializer(serializers.ModelSerializer):
    username = serializers.PrimaryKeyRelatedField(read_only=True)
    avatar = serializers.StringRelatedField()

    class Meta:
        model = User
        fields = ['id', 'username', 'avatar']


class MessageSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='username')
    target = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='id')

    class Meta:
        model = Message
        fields = ['id', 'text', 'target', 'author']


class RoomSerializer(serializers.HyperlinkedModelSerializer):
    author = serializers.SlugRelatedField(read_only=True, slug_field='id')
    members = UsersSerializer(many=True, read_only=True)

    class Meta:
        model = Room
        fields = ['id', 'author', 'name', 'members']


class RoomMembersSerializer(serializers.HyperlinkedModelSerializer):
    room = serializers.SlugRelatedField(queryset=Room.objects.all(), slug_field='id')
    member = serializers.SlugRelatedField(queryset=User.objects.all(), slug_field='id')

    class Meta:
        model = RoomMembers
        fields = ['id', 'room', 'member']
