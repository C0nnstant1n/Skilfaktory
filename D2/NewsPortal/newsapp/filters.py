from django_filters import FilterSet, ModelChoiceFilter, CharFilter
from .models import Post, Category


class PostFilter(FilterSet):
    category = ModelChoiceFilter(
        field_name='category',
        queryset=Category.objects.all(),
        label='Категории',
        empty_label='любая'
    )
    title = CharFilter(field_name='title', lookup_expr='icontains',
                       label='Заголовок')

    class Meta:
        model = Post
        fields = ['title', 'category']
