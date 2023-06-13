from django.db.models.signals import post_save
from django.dispatch import receiver
from django.core.mail import send_mail

from.models import Reply


@receiver(post_save, sender=Reply)
def email_to_reply(instance, **kwargs):
    if kwargs['created']:
        # при создании отклика отправляем сообщение автору объявления
        send_mail(
            subject=f'Новый отклик на ваше объявление',
            message=f'Пользователь {instance.author} откликнулся на ваше объявление "{instance.advert}"',
            from_email=None,  # будет использовано значение DEFAULT_FROM_EMAIL
            recipient_list=[instance.advert.author.email],
        )
    elif instance.status:
        # При принятии отклика отправляем сообщение автору отклика
        send_mail(
            subject=f'Ваш отклик принят',
            message=f'Пользователь {instance.advert.author} принял ваш отклик на объявление "{instance.advert}"',
            from_email=None,
            recipient_list=[instance.author.email],
        )
