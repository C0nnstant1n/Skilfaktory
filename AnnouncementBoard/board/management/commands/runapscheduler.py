import logging
import datetime
from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings
from django.core.management.base import BaseCommand
from django_apscheduler import util
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution
from board.models import Advert, User
from django.core.mail import EmailMultiAlternatives
from django.template.loader import render_to_string

logger = logging.getLogger(__name__)


def my_job():
    # Определяем дату (в нашем случае 7 дней назад)
    date = datetime.date.today() - datetime.timedelta(hours=1)
    # Получаем список объявлений за время определенное в date
    adverts = Advert.objects.filter(date__gte=date)
    subject = f'Последние объявления'
    emails = set(User.objects.all().values_list('email', flat=True))
    if adverts:
        for email in emails:
            text_content = ''
            for advert in adverts:
                text_content += f'{advert.title}\n' \
                                f'<a href="http://127.0.0.1:8000{advert.get_absolute_url()}">{advert.title}</a>\n'
            html_content = render_to_string(
                'board/email_adverts.html',
                {
                    'link': 'http://127.0.0.1:8000',
                    'adverts': adverts
                }
            )
            msg = EmailMultiAlternatives(
                subject=subject,
                body=text_content,
                from_email=None,
                to=[email]
            )
            msg.attach_alternative(html_content, 'text/html')
            msg.send()


@util.close_old_connections
def delete_old_job_executions(max_age=604_800):
    DjangoJobExecution.objects.delete_old_job_executions(max_age)


class Command(BaseCommand):
    help = "Runs APScheduler."

    def handle(self, *args, **options):
        scheduler = BlockingScheduler(timezone=settings.TIME_ZONE)
        scheduler.add_jobstore(DjangoJobStore(), "default")

        scheduler.add_job(
            my_job,
            trigger=CronTrigger(minute='0'),
            id="my_job",  # The `id` assigned to each job MUST be unique
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added job 'my_job'.")

        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(
                day_of_week="mon", hour="00", minute="00"
            ),
            id="delete_old_job_executions",
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added weekly job: 'delete_old_job_executions'.")

        try:
            logger.info("Starting scheduler...")
            scheduler.start()
        except KeyboardInterrupt:
            logger.info("Stopping scheduler...")
            scheduler.shutdown()
            logger.info("Scheduler shut down successfully!")
