from django import template
from ..models import Post, Comment
from django.db.models import Max

register = template.Library()


# добавляем тег для подстановки url в пагинацию страниц


@register.simple_tag(takes_context=True)
def url_replace(context, **kwargs):
    d = context['request'].GET.copy()
    for k, v in kwargs.items():
        d[k] = v
    return d.urlencode()


# тег для тестирования переменных в шаблоне


@register.simple_tag()
def type_func(var):
    print(type(var))
    print(type(var.user.username))
    print(var.user.username)
    return 'test'


@register.simple_tag()
def best_post():
    best = Post.objects.all().order_by('-post_rate')
    best_p = best[0]
    return best_p


# Получаем самый обсуждаемый пост
@register.simple_tag()
def most_commented():
    max_commited = Post.objects.get(id=Comment.objects.all().aggregate(Max('post')).get('post__max'))
    return max_commited
