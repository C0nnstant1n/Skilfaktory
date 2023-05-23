from django import template
from ..models import Post
from django.db.models import Count
from datetime import datetime
import pytz
register = template.Library()


# добавляем тег для подстановки url в пагинацию страниц


@register.simple_tag(takes_context=True)
def url_replace(context, **kwargs):
    d = context['request'].GET.copy()
    for k, v in kwargs.items():
        d[k] = v
    return d.urlencode()


@register.simple_tag()
def best_post():
    best = Post.objects.all().order_by('-post_rate')
    if not best:
        return best
    return best[0]


# Получаем самый обсуждаемый пост
@register.simple_tag()
def most_commented():
    max_commited = Post.objects.annotate(Count('comment')).order_by('-comment__count')
    if not max_commited:
        return max_commited
    return max_commited[0]


@register.simple_tag()
def publish_time(date):
    # приводим объекты datetime к одному часовому поясу
    utc_tz = pytz.timezone('utc')
    date_now = datetime.utcnow().astimezone(utc_tz)
    date_writing = date.astimezone(utc_tz)
    delta = date_now - date_writing

    minutes = round(delta.total_seconds() / 60)
    hours = round(minutes / 60)
    days = round(hours / 24)
    month = round(days / 30)
    years = round(month / 12)

    if minutes < 60:
        return f"{minutes} minutes ago"
    if hours <= 24:
        return f'{hours} hour`s ago'
    if days <= 30:
        return f'{days} day`s ago'
    if month <= 12:
        return f'{month} month`s ago'
    return f'{years} year`s ago'
