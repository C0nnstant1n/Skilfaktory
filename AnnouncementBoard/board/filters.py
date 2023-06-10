from .models import Reply, Advert
from django.db import models
from django.forms.widgets import CheckboxInput
import django_filters


def user_adverts(request):
    advert = Advert.objects.filter(author=request.user)
    return advert


class ReplyFilter(django_filters.FilterSet):

    advert = django_filters.ModelChoiceFilter(label='объявления', queryset=user_adverts, empty_label='по всем объявлениям')
    status = django_filters.BooleanFilter(label='принято?', widget=CheckboxInput)

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

        @property
        def qs(self):
            parent = super(ReplyFilter, self).qs
            author = getattr(self.request, 'user', None)
            return parent.filter(advert__author=author)
