from django.urls import path
from .views import LkView, EditLk

urlpatterns = [
    path('lk/<int:pk>', LkView.as_view(), name='lk'),
    path('editlk/<int:pk>', EditLk.as_view(), name='editlk')
]
