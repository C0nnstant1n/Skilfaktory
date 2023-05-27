"""NewsPortal URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/4.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from django.views.generic import TemplateView
from rest_framework import routers
from newsapp.views import PostViewSet
router = routers.DefaultRouter()
router.register(r'post', PostViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path("accounts/", include("allauth.urls")),
    path('', include('newsapp.urls')),
    path('api-auth/', include('rest_framework.urls'), name='rest_framework'),
    path('i18n/', include('django.conf.urls.i18n')),    # подключаем встроенные эндопинты для работы с локализацией
    path('swagger/', TemplateView.as_view(
        template_name='swagger.html', extra_context={'schema_url': 'openapi-schema'}), name='swagger'),
    
]
