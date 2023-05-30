from django_filters import FilterSet, ModelChoiceFilter, CharFilter, DateFilter
from .models import Advert, Category
from django.forms.widgets import DateInput


# фильтры по названию(заголовку), категории, дате
class AdvertFilter(FilterSet):
    category = ModelChoiceFilter(
        field_name='category',
        queryset=Category.objects.all(),
        empty_label='any'
    )
    title = CharFilter(field_name='title', lookup_expr='icontains')

    post_date = DateFilter(field_name='date', lookup_expr='gt',
                           widget=DateInput(attrs={'type': 'date'}))

    class Meta:
        model = Advert
        fields = ['title', 'author', 'category', 'date']
