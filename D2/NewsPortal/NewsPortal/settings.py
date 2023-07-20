"""
Django`s settings for NewsPortal project.

Generated by 'django-admin startproject' using Django 4.1.7.

For more information on this file, see
https://docs.djangoproject.com/en/4.1/topics/settings/

For the full list of settings and their values, see
https://docs.djangoproject.com/en/4.1/ref/settings/
"""
import os
from pathlib import Path
from .secrets import *
import django.core.mail.backends.console

# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent

# Quick-start development settings - unsuitable for production
# See https://docs.djangoproject.com/en/4.1/howto/deployment/checklist/

# SECURITY WARNING: keep the secret key used in production secret!


# SECURITY WARNING: don't run with debug turned on in production!
DEBUG = True

ALLOWED_HOSTS = ['127.0.0.1']
ADMINS = [('Konstantin', 'admin@123.ru')]

# Application definition

INSTALLED_APPS = [
    'modeltranslation',
    'django.contrib.admin',
    'django.contrib.auth',
    'django.contrib.contenttypes',
    'django.contrib.sessions',
    'django.contrib.messages',
    'django.contrib.staticfiles',
    'django.contrib.sites',
    'django.contrib.flatpages',
    'newsapp',
    'django_filters',
    'allauth',
    'allauth.account',
    'allauth.socialaccount',
    'allauth.socialaccount.providers.yandex',
    'django_apscheduler',
    'rest_framework',
]

MIDDLEWARE = [
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.locale.LocaleMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
    'django.contrib.flatpages.middleware.FlatpageFallbackMiddleware',
    'newsapp.middlewares.TimezoneMiddleware',
]

SITE_ID = 1
ROOT_URLCONF = 'NewsPortal.urls'

TEMPLATES = [
    {
        'BACKEND': 'django.template.backends.django.DjangoTemplates',
        'DIRS': [os.path.join(BASE_DIR, 'templates')],
        'APP_DIRS': True,
        'OPTIONS': {
            'context_processors': [
                'django.template.context_processors.debug',
                'django.template.context_processors.request',
                'django.contrib.auth.context_processors.auth',
                'django.contrib.messages.context_processors.messages',
                'django.template.context_processors.request',
            ],
        },
    },
]

WSGI_APPLICATION = 'NewsPortal.wsgi.application'

# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {

    # Настройки для sqlite3
    'default': {
        'ENGINE': 'django.db.backends.sqlite3',
        'NAME': BASE_DIR / 'db.sqlite3',
    }
    # Настройки для PostgreSQL
    # 'default': {
    #     'ENGINE': 'django.db.backends.postgresql',
    #     'NAME': 'testdb',
    #     'USER': 'testuser',
    #     'PASSWORD': 'testuser',
    #     'HOST': 'localhost',
    #     'PORT': '5432',
    # },
}

# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        'NAME': 'django.contrib.auth.password_validation.UserAttributeSimilarityValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.MinimumLengthValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.CommonPasswordValidator',
    },
    {
        'NAME': 'django.contrib.auth.password_validation.NumericPasswordValidator',
    },
]

# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = 'en-us'
LANGUAGES = [
    ('en-us', 'English'),
    ('ru', 'Русский')
]
TIME_ZONE = 'UTC'

USE_I18N = True
LOCALE_PATHS = [
    os.path.join(BASE_DIR, 'locale')
]

USE_TZ = True

# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/


STATIC_URL = 'static/'
STATICFILES_DIRS = [
    "static",
]

CSRF_COOKIE_SECURE = True
SESSION_COOKIE_SECURE = True

# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = 'django.db.models.BigAutoField'

LOGIN_REDIRECT_URL = "/news"
LOGOUT_REDIRECT_URL = "/news"

AUTHENTICATION_BACKENDS = [
    'django.contrib.auth.backends.ModelBackend',
    'allauth.account.auth_backends.AuthenticationBackend',
]

ACCOUNT_EMAIL_REQUIRED = True
ACCOUNT_UNIQUE_EMAIL = True
ACCOUNT_USERNAME_REQUIRED = False
ACCOUNT_AUTHENTICATION_METHOD = 'email'
ACCOUNT_EMAIL_VERIFICATION = 'mandatory'
ACCOUNT_EMAIL_CONFIRMATION_EXPIRE_DAYS = 1

EMAIL_BACKEND = 'django.core.mail.backends.console.EmailBackend'

APSCHEDULER_RUN_NOW_TIMEOUT = 25
APSCHEDULER_DATETIME_FORMAT = "N j, Y, f:s a"

# celery settings
CELERY_BROKER_URL = 'redis://localhost:6379'
CELERY_RESULT_BACKEND = 'redis://localhost:6379'
CELERY_ACCEPT_CONTENT = ['application/json']
CELERY_TASK_SERIALIZER = 'json'
CELERY_RESULT_SERIALIZER = 'json'

REST_FRAMEWORK = {
    'DEFAULT_FILTER_BACKENDS': ['django_filters.rest_framework.DjangoFilterBackend'],
    'DEFAULT_PAGINATION_CLASS': 'rest_framework.pagination.LimitOffsetPagination',
    'PAGE_SIZE': 5
}

# cache by files
CACHES = {
    'default': {
        'BACKEND': 'django.core.cache.backends.filebased.FileBasedCache',
        'LOCATION': os.path.join(BASE_DIR, 'cache_files'),  # Указываем, куда будем сохранять
        # кэшируемые файлы! Не забываем создать папку cache_files внутри папки с manage.py!
    }
}

LOGGING = {
    'version': 1,
    'disable_existing_loggers': False,
    'formatters': {
        'info_formatter': {
            'format': '[{asctime}] {levelname} {message}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'error_formatter': {
            'format': '[{asctime}] {levelname} : {message} : File - {pathname} : Exception tuple: {exc_info} : Stack '
                      'frame information: {stack_info}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'warning_formatter': {
            'format': '[{asctime}] {levelname} : {message} : File - {pathname}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'general_log': {
            'format': '[{asctime}] {levelname} : Module - {module} : {message}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'errors_log': {
            'format': '[{asctime}] {levelname} :  {message} : File - {pathname} : {exc_info}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'mail_admins': {
            'format': '[{asctime}] {levelname} :  {message} : File - {pathname}',
            'datefmt': '%d-%m-%Y %H:%M',
            'style': '{',
        },
        'message': {
            'format': '[{levelname} {module} {message}]',
            'style': '{'
        }
    },
    'filters': {
        'require_debug_true': {
            '()': 'django.utils.log.RequireDebugTrue',
        },
        'require_debug_false': {
            '()': 'django.utils.log.RequireDebugFalse',
        },

        'filter_info_level': {
            '()': 'newsapp.log_filter.FilterLevels',
            'filter_levels': [
                "INFO"
            ]
        },
        'filter_error_level': {
            '()': 'newsapp.log_filter.FilterLevels',
            'filter_levels': [
                "ERROR"
            ]
        },
        'filter_warning_level': {
            '()': 'newsapp.log_filter.FilterLevels',
            'filter_levels': [
                "WARNING"
            ]
        },
    },
    'handlers': {
        'info': {
            'filters': ['filter_info_level', 'require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'info_formatter',
        },
        'warning': {
            'filters': ['filter_warning_level', 'require_debug_false'],
            'class': 'logging.StreamHandler',
            'formatter': 'warning_formatter'
        },
        'error': {
            'filters': ['filter_error_level', 'require_debug_false'],
            'class': 'logging.StreamHandler',
            'formatter': 'error_formatter'
        },
        'general': {
            'filters': ['require_debug_false'],
            'level': 'INFO',
            'class': 'logging.FileHandler',
            'filename': 'general.log',
            'formatter': 'general_log'
        },
        'error_file': {
            'level': 'ERROR',
            'class': 'logging.FileHandler',
            'filename': 'error.log',
            'formatter': 'errors_log'
        },
        'security_file': {
            'class': 'logging.FileHandler',
            'filename': 'security.log',
            'formatter': 'general_log'
        },
        'mail_admins': {
            'filters': ['require_debug_false'],
            'level': 'ERROR',
            'class': 'django.utils.log.AdminEmailHandler',
            'include_html': False,
            'reporter_class': 'newsapp.error_reporter.CustomErrorReporter',
            'formatter': 'mail_admins'
        },
        'newsapp': {
            'filters': ['filter_info_level', 'require_debug_true'],
            'class': 'logging.StreamHandler',
            'formatter': 'message',
            'level': 'INFO',
        },
    },
    'loggers': {
        'django': {
            'handlers': ['info', 'warning', 'error', 'general'],
            'propagate': True,
            # 'level': 'DEBUG',
        },
        'django.server': {
            'handlers': ['error_file', 'mail_admins'],
            'propagate': True,
            # 'level': 'DEBUG',
        },
        'django.request': {
            'handlers': ['error_file', 'mail_admins'],
            # 'level': 'ERROR',
            'propagate': True,
        },
        'django.template': {
            'handlers': ['error_file'],
            # 'level': 'ERROR',
            'propagate': True,
        },
        'django.db.backends': {
            'handlers': ['error_file'],
            # 'level': 'ERROR',
            'propagate': True,
        },
        'django.security': {
            'handlers': ['security_file'],
            # 'level': 'INFO',
            'propagate': True,
        },
        'newsapp': {
            'handlers': ['newsapp'],
            'level': 'INFO',
        },
    }
}
