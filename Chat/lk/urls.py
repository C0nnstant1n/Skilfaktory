from django.urls import path
from .views import index, LkView

urlpatterns = [
    path('lk/<int:pk>', LkView.as_view(), name='lk')
]
