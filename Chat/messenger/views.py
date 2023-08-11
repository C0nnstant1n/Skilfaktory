from rest_framework import viewsets
from rest_framework.response import Response
from rest_framework.decorators import action
from .serializers import *
from django.views.generic import CreateView, TemplateView
from .forms import CreateMessageForm
from .models import Room
from django.http import HttpResponse, JsonResponse


class CurrentUser(viewsets.ReadOnlyModelViewSet):
    serializer_class = CurrentUserSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = User.objects.filter(id=self.request.user.id)
        else:
            queryset = []
        return queryset


class UsersViewSet(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class MessageViewSet(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer

    def get_queryset(self):
        queryset = []
        target = self.request.query_params.get('target')
        if target is not None:
            queryset = Message.objects.filter(target=target)
        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    # permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            # queryset = Room.objects.all()
            queryset = Room.objects.filter(members=self.request.user.id)
        else:
            queryset = []
        return queryset

    @action(detail=True)
    def members(self, request, pk=None):
        room = self.get_object()
        members = room.members.all()
        members_serializer = UsersSerializer(members, many=True)
        return JsonResponse(members_serializer.data, safe=False)

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RoomMembersViewSet(viewsets.ModelViewSet):
    queryset = RoomMembers.objects.all()
    serializer_class = RoomMembersSerializer

    # def get_queryset(self):
    #     queryset = []
    #     target = self.request.query_params.get('id')
    #     if target is not None:
    #         queryset = Room.objects.get(id=target).members.all()
    #     return queryset



class IndexView(TemplateView):
    template_name = 'default.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['users'] = User.objects.all()
        return context


# class CreateRoomView(TemplateView):
#     template_name = 'messenger/create_room.html'

    # def perform_create(self, serializer):
    #     serializer.save(author=self.request.user)
