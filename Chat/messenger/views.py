from rest_framework import viewsets, mixins, permissions, generics
from rest_framework.views import APIView
from .serializers import *
from django.views.generic import CreateView, TemplateView
from .forms import CreateMessageForm
from .models import Room


class CurrentUser(viewsets.ReadOnlyModelViewSet):
    serializer_class = CurrentUserSerializer

    def get_queryset(self):
        if self.request.user.is_authenticated:
            queryset = User.objects.filter(id=self.request.user.id).distinct()
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
            queryset = Message.objects.filter(target=target).distinct()
        return queryset


class RoomViewSet(viewsets.ModelViewSet):
    serializer_class = RoomSerializer
    permission_classes = [permissions.AllowAny]

    def get_queryset(self):
        if self.request.user.is_authenticated:
            query = Room.objects.filter(members=self.request.user.id).distinct()
            print(type(query))
            queryset = query
            print(queryset)
        else:
            queryset = []
        return queryset

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)


class RoomDetailViewSet(generics.RetrieveUpdateDestroyAPIView):
    queryset = Room.objects.all()
    serializer_class = RoomSerializer


class RoomMembersViewSet(viewsets.ModelViewSet):
    queryset = RoomMembers.objects.all()
    serializer_class = RoomMembersSerializer


class IndexView(TemplateView):
    template_name = 'default.html'

    def get_context_data(self, **kwargs):
        context = super().get_context_data(**kwargs)
        context['users'] = User.objects.all()
        return context


class CreateRoomView(TemplateView):
    template_name = 'messenger/create_room.html'

    def perform_create(self, serializer):
        serializer.save(author=self.request.user)
