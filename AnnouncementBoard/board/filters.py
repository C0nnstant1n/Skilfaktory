from django_filters import FilterSet, ModelChoiceFilter, CharFilter, DateFilter
from .models import Advert, Reply
from django.forms.widgets import DateInput


# фильтры по названию(заголовку), категории, дате

class ReplyFilter(FilterSet):
    class Meta:
        model = Advert
        fields = ['author']
