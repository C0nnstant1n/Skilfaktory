# main:  Educational project - NewsPortal (homeworks)

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
