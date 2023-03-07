import django_filters
from django_filters import FilterSet
from .models import Product


# Создаем свой набор фильтров для модели Product.
# FilterSet, который мы наследуем,
# должен чем-то напомнить знакомые вам Django дженерики.
class ProductFilter(FilterSet):
    name = django_filters.CharFilter(field_name='name', lookup_expr='icontains', label='Название')
    quantity = django_filters.CharFilter(field_name='quantity', lookup_expr='gt', label='Кол-во больше чем')
    higher_price = django_filters.CharFilter(field_name='price', lookup_expr='gt', label='Цена выше')
    lower_price = django_filters.CharFilter(field_name='price', lookup_expr='lt', label='Цена ниже')

    class Meta:
        # В Meta классе мы должны указать Django модель,
        # в которой будем фильтровать записи.
        model = Product

        fields = ['name', 'quantity', 'higher_price', 'lower_price']
