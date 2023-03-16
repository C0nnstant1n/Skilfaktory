from django.urls import path
# Импортируем созданное нами представление
from .views import PostsList, PostDetail, Search, CreatePost, EditPost, CreateArticle, EditArticle, DeletePost



urlpatterns = [
   # path — означает путь.
   # В данном случае путь ко всем постам у нас останется пустым,
   # Т.к. наше объявленное представление является классом,
   # а Django ожидает функцию, нам надо представить этот класс в виде view.
   # Для этого вызываем метод as_view.
   path('news/', PostsList.as_view(), name='posts'),
   path('news/<int:pk>', PostDetail.as_view(), name='post'),
   path('news/search', Search.as_view(), name='search'),
   path('news/create', CreatePost.as_view(),  name='create_news'),
   path('news/<int:pk>/edit/', EditPost.as_view(), name='edit_news'),
   path('news/<int:pk>/delete/', DeletePost.as_view(), name='delete'),
   path('articles/create', CreateArticle.as_view(),  name='create_news'),
   path('articles/<int:pk>/edit/', EditArticle.as_view(), name='edit_news'),
   path('articles/<int:pk>/delete/', DeletePost.as_view(), name='delete'),



]
