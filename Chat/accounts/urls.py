from django.urls import path, include
from .views import LkView, SignUp, EditUser

urlpatterns = [
    path('accounts/<int:pk>', LkView.as_view(), name='accounts'),
    path('accounts/signup', SignUp.as_view(), name='signup'),
    path('accounts/edit/<int:pk>', EditUser.as_view(), name='edit'),
    path('', include('messenger.urls'))
]
