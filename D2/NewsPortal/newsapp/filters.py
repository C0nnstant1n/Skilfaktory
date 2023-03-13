from django_filters import FilterSet, ModelChoiceFilter, CharFilter, DateFilter
from .models import Post, Category
from django.forms.widgets import DateInput


class PostFilter(FilterSet):
    category = ModelChoiceFilter(
        field_name='category',
        queryset=Category.objects.all(),
        empty_label='any'
    )
    title = CharFilter(field_name='title', lookup_expr='icontains')

    post_date = DateFilter(field_name='post_date', lookup_expr='gt',
                               widget=DateInput(attrs={'type': 'date'}))

    class Meta:
        model = Post
        fields = ['title', 'category', 'post_date']
