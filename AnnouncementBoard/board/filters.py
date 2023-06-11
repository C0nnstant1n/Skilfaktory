from .models import Reply, Advert
from django.db import models
from django.forms.widgets import CheckboxInput
import django_filters


def user_adverts(request):
    advert = Advert.objects.filter(author=request.user)
    return advert


class ReplyFilter(django_filters.FilterSet):

    advert = django_filters.ModelChoiceFilter(label='объявления', queryset=user_adverts,
                                              empty_label='по всем объявлениям')
    status = django_filters.BooleanFilter(label='принято?')

    class Meta:
        model = Reply
        fields = ['status', 'advert']

    # так как мы должны получать отклики только на свои объявления
    # переопределим qs
    @property
    def qs(self):
        parent = super().qs
        author = self.request.user
        return parent.filter(advert__author=author)
