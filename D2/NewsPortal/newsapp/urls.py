from django.urls import path, include
# Импортируем созданное нами представление
from .views import *




urlpatterns = [
   # Переменная path — означает путь.
   # В данном случае путь ко всем постам у нас останется пустым,
   # Т.к. наше объявленное представление является классом,
   # а Django ожидает функцию, нам надо представить этот класс в виде view.
   # Для этого вызываем метод as_view.
   # path('', home),
   path('', HomeView.as_view(), name='home'),
   path('news/', PostsList.as_view(), name='posts'),
   path('news/<int:pk>', PostDetail.as_view(), name='post'),
   path('news/<int:pk>/comment/', CommentCreate.as_view(), name='create_comment'),
   path('news/search', Search.as_view(), name='search'),
   path('news/create', CreatePost.as_view(),  name='create_news'),
   path('news/<int:pk>/edit/', EditPost.as_view(), name='edit_news'),
   path('news/<int:pk>/delete/', DeletePost.as_view(), name='delete'),
   path('articles/create', CreateArticle.as_view(),  name='create_articles'),
   path('articles/<int:pk>/edit/', EditArticle.as_view(), name='edit_articles'),
   path('articles/<int:pk>/delete/', DeletePost.as_view(), name='delete'),
   path('subscriptions/', subscriptions, name='subscriptions'),
   path('clear', clear_cache, name='clear_cache'),
]
