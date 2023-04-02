import django_filters
from django_filters import FilterSet, ModelChoiceFilter
from .models import Product, Category


# Создаем свой набор фильтров для модели Product.
# FilterSet, который мы наследуем,
# должен чем-то напомнить знакомые вам Django дженерики.
class ProductFilter(FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains', label='Название')
    # higher_price = django_filters.CharFilter(field_name='price', lookup_expr='gt', label='Цена выше')
    # lower_price = django_filters.CharFilter(field_name='price', lookup_expr='lt', label='Цена ниже')
    category = django_filters.ModelChoiceFilter(
        field_name='category__name',
        queryset=Category.objects.all(),
        label='Категория')

    class Meta:
        # В Meta классе мы должны указать Django модель,
        # в которой будем фильтровать записи.
        model = Product

        fields = {'price': ['lt', 'gt'], }
