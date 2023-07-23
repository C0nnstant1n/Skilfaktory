from django.urls import path
from .views import LkView, SignUp, EditUser

urlpatterns = [
    path('lk/<int:pk>', LkView.as_view(), name='lk'),
    path('signup', SignUp.as_view(), name='signup'),
    path('lk/edit/<int:pk>', EditUser.as_view(), name='edit'),
]
