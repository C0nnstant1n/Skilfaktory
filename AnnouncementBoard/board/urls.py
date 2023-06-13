from django.urls import path
from .views import (
    index,
    AdvertList,
    AdvertDetail,
    CreateAdvert,
    EditAdvert,
    DeleteAdvert,
    ReplyAdvert,
    RepliesList,
    DeleteReply,
    confirm_reply
)

urlpatterns = [
    path('', index, name='index'),
    path('adverts/', AdvertList.as_view(), name='adverts'),
    path('adverts/create', CreateAdvert.as_view(), name='create'),
    path('adverts/<int:pk>', AdvertDetail.as_view(), name='advert'),
    path('adverts/<int:pk>/reply', ReplyAdvert.as_view(), name='reply'),
    path('adverts/<int:pk>/edit', EditAdvert.as_view(), name='edit'),
    path('adverts/<int:pk>/delete', DeleteAdvert.as_view(), name='delete'),
    path('replies/', RepliesList.as_view(), name='replies'),
    path('replies/<int:pk>/delete', DeleteReply.as_view(), name='delete'),
    path('replies/confirm', confirm_reply, name='confirm_reply'),
]
