from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import post_save
from django.dispatch import receiver

from .models import Post, Category


@receiver(post_save, sender=Post)
def post_created(instance, created, **kwargs):
    if not created:
        return
    print(type(instance), created, 'created')

    emails = User.objects.filter(
        subscriptions__category=4
    ).values_list('email', flat=True)

    print(instance.category)
    categories = set(Category.objects.filter(post=instance.id))
    # for i in categories:
    #     print(i)
    print(categories)
    subject = f'New Post in  {instance.category}'

    text_content = (
        f'Post: {instance.title}\n'
        f'The post is available at the: http://127.0.0.1{instance.get_absolute_url()}'
    )
    html_content = (
        f'Post: {instance.title}<br>'
        f'<a href="http://127.0.0.1{instance.get_absolute_url()}">'
        f'Link to post</a>'
    )
    # for email in emails:
    #     msg = EmailMultiAlternatives(subject, text_content, None, [email])
    #     msg.attach_alternative(html_content, "text/html")
    #     msg.send()
