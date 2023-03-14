from django import template
from datetime import datetime
register = template.Library()

# добавляем тег для подстановки url в пагинацию страниц


@register.simple_tag(takes_context=True)
def url_replace(context, **kwargs):
    d = context['request'].GET.copy()
    for k, v in kwargs.items():
        d[k] = v
    return d.urlencode()
