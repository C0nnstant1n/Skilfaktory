from celery import shared_task
from .management.commands.runapscheduler import my_job
from .models import User, Post
from django.core.mail import EmailMultiAlternatives
import time


@shared_task
def mail_subscribers():
    my_job()
    return 'succeed'


@shared_task
def mail_on_created(instance_id):
    time.sleep(10)  # added for test
    instance = Post.objects.get(id=instance_id)
    categories = instance.category.all()

    for i in categories:
        email = User.objects.filter(subscriptions__category=i).values_list('email', flat=True)
        subject = f'New Post in {i.category_name}'
        text_content = (
            f'Post: {instance.title}\n'
            f'The post is available at the: http://127.0.0.1:8000{instance.get_absolute_url()}'
        )
        html_content = (
            f'Post: {instance.title}<br>'
            f'<a href="http://127.0.0.1:8000{instance.get_absolute_url()}">'
            f'Link to post</a>'
        )

        for _ in email:
            msg = EmailMultiAlternatives(subject, text_content, None, [_])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
