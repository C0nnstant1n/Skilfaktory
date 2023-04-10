from django import template
from ..models import Post
from django.db.models import Count

register = template.Library()


# добавляем тег для подстановки url в пагинацию страниц


@register.simple_tag(takes_context=True)
def url_replace(context, **kwargs):
    d = context['request'].GET.copy()
    for k, v in kwargs.items():
        d[k] = v
    return d.urlencode()


# тег для тестирования переменных в шаблоне

#
# @register.simple_tag()
# def type_func(var):
#     print(type(var))
#     print(type(var.user.username))
#     print(var.user.username)
#     return 'test'
#

@register.simple_tag()
def best_post():
    best = Post.objects.all().order_by('-post_rate')
    return best[0]


# Получаем самый обсуждаемый пост
@register.simple_tag()
def most_commented():
    max_commited = Post.objects.annotate(Count('comment')).order_by('-comment__count')
    return max_commited[0]


# @register.simple_tag()
# def comments(id):
#     comments = Comment.objects.filter(post=id)
#     return comments
