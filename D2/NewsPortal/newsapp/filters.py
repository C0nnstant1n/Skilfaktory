from django_filters import FilterSet, ModelChoiceFilter, CharFilter, DateFilter
from .models import Post, Category
from django.forms.widgets import DateInput


# фильтры по названию(заголовку), категории (правильнее сделать, чтобы можно было выбрать несколько
# категорий одновременно, но в текущем виде мне не нравится представление выбора, когда изучим
# чекбоксы или кнопки, переделаю). Фильтр по дате сделал именно в виде даты, так как добавлять еще
# и время, мне кажется неэстетично и бессмысленно
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
        fields = ['title', 'author', 'category', 'post_date']
