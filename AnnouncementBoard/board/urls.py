from django.urls import path, include
from .views import index, AdvertList, AdvertDetail
from froala_editor import views

urlpatterns = [
    path('', index, name='index'),
    path('adverts/', AdvertList.as_view(), name='adverts'),
    path('adverts/<int:pk>', AdvertDetail.as_view(), name='advert'),
    path('froala_editor/', include('froala_editor.urls')),
]
