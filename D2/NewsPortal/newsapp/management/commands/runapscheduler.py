import datetime
import logging

from apscheduler.schedulers.blocking import BlockingScheduler
from apscheduler.triggers.cron import CronTrigger
from django.conf import settings
from django.core.management.base import BaseCommand
from django_apscheduler import util
from django_apscheduler.jobstores import DjangoJobStore
from django_apscheduler.models import DjangoJobExecution

from newsapp.models import Post, Category, User
from django.core.mail import send_mail

logger = logging.getLogger(__name__)


def my_job():
    date = datetime.date.today() - datetime.timedelta(days=7)
    categories = Category.objects.all()
    for category in categories:
        emails = User.objects.filter(subscriptions__category=category).values_list('email', flat=True)
        posts_category = Post.objects.filter(post_date__gt=date, category=category)
        if posts_category:
            subject = f'New Post in {category.category_name}'
            for email in emails:
                text_content = ''
                for post in posts_category:
                    text_content += (
                        f'Post: {post.title}\n'
                        f'The post is available at the: http://127.0.0.1:8000{post.get_absolute_url()}\n\n'
                    )
            print(email)
            send_mail(
                subject=subject,
                message=text_content,
                from_email=None,
                recipient_list=[email]
            )


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
            trigger=CronTrigger(minute="*/5"),
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