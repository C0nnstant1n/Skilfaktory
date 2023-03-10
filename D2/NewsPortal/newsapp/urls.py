from django.urls import path
# Импортируем созданное нами представление
from .views import PostsList, PostDetail, Search
from .filters import PostFilter


urlpatterns = [
   # path — означает путь.
   # В данном случае путь ко всем постам у нас останется пустым,
   # Т.к. наше объявленное представление является классом,
   # а Django ожидает функцию, нам надо представить этот класс в виде view.
   # Для этого вызываем метод as_view.
   path('', PostsList.as_view(), name='posts'),
   path('<int:pk>', PostDetail.as_view(), name='post'),
   path('search', Search.as_view(), name='search'),
]
