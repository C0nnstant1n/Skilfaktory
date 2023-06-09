from .models import Reply
from django.db import models
from django.forms.widgets import CheckboxInput
import  django_filters


class ReplyFilter(django_filters.FilterSet):
    advert = Reply.objects.filter(advert__author=1)

    class Meta:
        model = Reply
        fields = ['status', 'advert']

        filter_overrides = {
            models.BooleanField: {
                'filter_class': django_filters.BooleanFilter,
                'extra': lambda f: {
                    'widget': CheckboxInput,
                },
            },
        }
