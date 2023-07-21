from django.urls import path
from .views import LkView, HomeView

path('lk/', HomeView.as_view(), name='lk'),
