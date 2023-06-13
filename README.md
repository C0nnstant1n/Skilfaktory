# Skillfaktory

Branches:

# main - Homeworks for verification
    current project "Announcement Board"
        В файле _secrets_.txt указано примерное содержимое файла secrets.txt
            в нем настраиваются секретные настройки сайта

        Добавление изображений и видео реализовано с помощью  WYSIWYG редактора Summernote - 
            https://github.com/summernote/django-summernote

        Новостные рассылки реализованы с помощью Apscheduler - 
            https://pypi.org/project/django-apscheduler/
            по умолчаню каждый час

        Вход и регистрация на сайте с помощью django-allauth
        - в проекте используется регистрация/вход по emeil и паролю, а также через Yandex
        - настройки социальных приложений по адресу - http://127.0.0.1:8000/admin/socialaccount/socialapp/


# NewsPortal (homeworks)

    06.04.2023
    Added caching
        - For clarity, caching is performed in the file system
        - As long as the article has not changed, it is stored in the cache.
          Edited Post model and PostDetail in views
        - All navigation elements (menus, sidebars, etc.) are cached in templates.

    03.04.2023
    - add Redis and Celery configured django, Redis and Celery configurations
      (NewsPortal/settings.py)
    - added a newsletter to subscribers about the creation of news
      (newsapp/sygnals.py, newsapp/tasks.py)
    - added a weekly newsletter (NewsPortal/celery.py, newsapp/tasks.py)

# D1-D(n):  Educational project - shop (working draft)

# Game Sea War

    Игра морской бой

# Game X-0

    Игра крестики - нолики

# telegram bot

    телеграмм бот (конвертер валют)
