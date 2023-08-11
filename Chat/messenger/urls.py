from django.urls import path, include
from rest_framework import routers
from .views import *


# room_detail = RoomViewSet.as_view({
#     'get': 'retrieve',
#     'put': 'update',
#     'patch': 'partial_update',
#     'delete': 'destroy'
# })
router = routers.DefaultRouter()
router.register(r'message', MessageViewSet)
router.register(r'current_user', CurrentUser, basename='id')
router.register(r'users', UsersViewSet, basename='users')
router.register(r'room', RoomViewSet, basename='room')
router.register(r'members', RoomMembersViewSet, basename='members')


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework')),
]
