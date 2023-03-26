from django.contrib.auth.models import User
from django.core.mail import EmailMultiAlternatives
from django.db.models.signals import m2m_changed, post_save
from django.dispatch import receiver

from .models import Post, Category, PostCategory


# @receiver(post_save, sender=Post)
# def post_created(instance,  **kwargs):
#     l = PostCategory.objects.filter(post_id__gt=instance.id-2)
#     print(l)
#     print(instance.id)
#     print("request")


# My first variant
@receiver(m2m_changed, sender=Post.category.through)
def post_created(instance, action, **kwargs):
    if action == 'pre_add':
        return
    categories = Category.objects.filter(post=instance.id)
    for i in categories:
        print(i.category_name)
        email = User.objects.filter(subscriptions__category=i).values_list('email', flat=True)
        subject = f'New Post in {i.category_name}'
        text_content = (
            f'Post: {instance.title}\n'
            f'The post is available at the: http://127.0.0.1{instance.get_absolute_url()}'
        )
        html_content = (
            f'Post: {instance.title}<br>'
            f'<a href="http://127.0.0.1{instance.get_absolute_url()}">'
            f'Link to post</a>'
        )

        for _ in email:
            msg = EmailMultiAlternatives(subject, text_content, None, [_])
            msg.attach_alternative(html_content, "text/html")
            msg.send()
