from django.urls import path, include
from rest_framework import routers
from .views import *

router = routers.DefaultRouter()
router.register(r'message', MessageViewset)
router.register(r'currentuser', CurrentUser, basename='id')
router.register(r'users', UsersViewset)
router.register(r'room', RoomViewset, basename='members')
router.register(r'RoomMembers', RoomMembersViewset)


urlpatterns = [
    path('', IndexView.as_view(), name='index'),
    path('create/', CreateMessage.as_view(), name='create'),
    path('api/', include(router.urls)),
    path('api-auth/', include('rest_framework.urls', namespace='rest_framework'))
]
