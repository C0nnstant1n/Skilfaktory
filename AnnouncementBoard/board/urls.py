from django.urls import path, include
from .views import index, AdvertList, AdvertDetail, CreateAdvert, EditAdvert, DeleteAdvert
from froala_editor import views

urlpatterns = [
    path('', index, name='index'),
    path('adverts/', AdvertList.as_view(), name='adverts'),
    path('adverts/create', CreateAdvert.as_view(), name='create'),
    path('adverts/<int:pk>', AdvertDetail.as_view(), name='advert'),
    path('adverts/<int:pk>/edit', EditAdvert.as_view(), name='edit'),
    path('adverts/<int:pk>/delete', DeleteAdvert.as_view(), name='delete'),
    path('froala_editor/', include('froala_editor.urls')),
]
