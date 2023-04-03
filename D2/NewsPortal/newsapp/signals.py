from django.db.models.signals import m2m_changed
from django.dispatch import receiver

from .models import Post
from .tasks import mail_on_created


@receiver(m2m_changed, sender=Post.category.through)
def post_created(instance, **kwargs):
    if kwargs['action'] == 'post_add':
        mail_on_created.delay(instance.id)      # passing the task to Celery tasks
