from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'message', MessageViewSet)
router.register(r'current_user', CurrentUser, basename='id')
router.register(r'users', UsersViewSet, basename='users-list')
router.register(r'room', RoomViewSet, basename='rooms')
router.register(r'members', RoomMembersViewSet, basename='members')


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('create/', CreateRoomView.as_view(), name='create'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
