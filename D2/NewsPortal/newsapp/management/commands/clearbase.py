from django.core.management.base import BaseCommand, CommandError
from newsapp.models import Post, Category


class Command(BaseCommand):
    help = 'Clear  data base by [argument] category (db.sqlite3)'  # показывает подсказку при вводе "python manage.py
    # <ваша команда> --help"
    missing_args_message = 'Недостаточно аргументов'
    requires_migrations_checks = True  # Напоминать ли о миграциях. Если тру — то будет напоминание о
    # том, что не сделаны все миграции (если такие есть)

    def add_arguments(self, parser):
        # Positional arguments
        parser.add_argument('category', nargs='+', type=str)

    def handle(self, *args, **options):
        # здесь можете писать любой код, который выполняется при вызове вашей команды
        category = Category.objects.all().values_list('category_name', flat=True)
        a = str(*options['category'])
        if a not in category:
            self.stdout.write(self.style.ERROR('No such category'))
            return

        self.stdout.readable()
        self.stdout.write(f'Do you really want to delete all posts in {options["category"]}? yes/no')
        # спрашиваем пользователя действительно ли он хочет удалить посты в категории

        answer = input()  # считываем подтверждение
        if answer == 'yes':  # в случае подтверждения действительно удаляем все посты
            Post.objects.filter(category__category_name=a).delete()
            self.stdout.write(self.style.SUCCESS(f'Posts in {a} category was deleted'))
            return

        self.stdout.write(self.style.ERROR(f'Deletion canceled'))  # в случае неправильного подтверждения, говорим что
        # удаление отменено
