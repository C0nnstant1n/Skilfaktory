import datetime
import logging

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings
from django.core.management.base import BaseCommand
from django.template.loader import render_to_string
from django_apscheduler import util
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution

from django.shortcuts import render
from newsapp.models import Post, Category
from django.core.mail import EmailMultiAlternatives

logger = logging.getLogger(__name__)


def my_job():
    # Определяем дату (в нашем случае 7 дней назад)
    date = datetime.date.today() - datetime.timedelta(days=7)
    # Получаем список статей за прошедшую неделю
    posts = Post.objects.filter(post_date__gte=date)
    categories = set(posts.values_list('category__category_name', flat=True))
    subscribers = set(Category.objects.filter(
        category_name__in=categories).values_list('subscriptions__user__email', flat=True))
    subject = f'Latest news this week on News Portal'
    for email in subscribers:
        text_content = ''
        for post in posts:
            text_content += f'{post.category}\n' \
                            f'<a href="http://127.0.0.1:8000{post.get_absolute_url()}">{post.title}</a>\n'
        html_content = render_to_string(
            'weekly_posts.html',
            {
                'link': 'http://127.0.0.1:8000',
                'posts': posts
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
            trigger=CronTrigger(
                day_of_week="fri", hour="18", minute="00"
            ),
            id="my_job",  # The `id` assigned to each job MUST be unique
            max_instances=1,
            replace_existing=True,
        )
        logger.info("Added job 'my_job'.")

        scheduler.add_job(
            delete_old_job_executions,
            trigger=CronTrigger(
                day_of_week="sun", hour="00", minute="00"
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