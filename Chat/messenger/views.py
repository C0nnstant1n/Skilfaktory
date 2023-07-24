from django.shortcuts import render
from rest_framework import viewsets, permissions
from .serializers import *
from django.views.generic import CreateView
from .forms import CreateMessageForm


class MessageViewset(viewsets.ModelViewSet):
    queryset = Message.objects.all()
    serializer_class = MessageSerializer


class RoomViewset(viewsets.ModelViewSet):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


def index(request):
    return render(request, 'default.html')


class CreateMessage(CreateView):
    model = Message
    form_class = CreateMessageForm
    template_name = 'messenger/create.html'

