from django.shortcuts import render

from rest_framework import viewsets
from rest_framework.decorators import api_view
from rest_framework.response import Response
from .serializers import *
from django.views.generic import CreateView, TemplateView
from .forms import CreateMessageForm
from .models import Room


class CurrentUser(viewsets.ReadOnlyModelViewSet):
    serializer_class = CurrentUserSerializer

    def get_queryset(self):
        queryset = User.objects.filter(id=self.request.user.id)
        return queryset


class UsersViewset(viewsets.ModelViewSet):
    queryset = User.objects.all()
    serializer_class = UsersSerializer


class MessageViewset(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class RoomViewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomMembersViewset(viewsets.ModelViewSet):
    queryset = RoomMembers.objects.all()
    serializer_class = RoomMembersSerializer


class IndexView(TemplateView):
    template_name = 'default.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['users'] = User.objects.all()
        if self.request.user.is_authenticated:
            if RoomMembers.objects.filter(user=self.request.user):
                context['rooms'] = RoomMembers.objects.filter(user=self.request.user)
        return context


class CreateMessage(CreateView):
    model = Room
    form_class = CreateMessageForm
    template_name = 'messenger/create.html'
