# Generated by Django 4.2.1 on 2023-05-30 10:04

from django.conf import settings
from django.db import migrations, models
import django.db.models.deletion


class Migration(migrations.Migration):

    initial = True

    dependencies = [
        migrations.swappable_dependency(settings.AUTH_USER_MODEL),
    ]

    operations = [
        migrations.CreateModel(
            name='Advert',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('date', models.DateTimeField(auto_now_add=True)),
                ('title', models.CharField(max_length=128)),
                ('text', models.TextField()),
            ],
        ),
        migrations.CreateModel(
            name='Category',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('category_name', models.CharField(max_length=16, unique=True)),
            ],
        ),
        migrations.CreateModel(
            name='Author',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('user', models.OneToOneField(on_delete=django.db.models.deletion.CASCADE, to=settings.AUTH_USER_MODEL)),
            ],
        ),
        migrations.CreateModel(
            name='AdvertCategory',
            fields=[
                ('id', models.BigAutoField(auto_created=True, primary_key=True, serialize=False, verbose_name='ID')),
                ('advert', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.advert')),
                ('category', models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.category')),
            ],
        ),
        migrations.AddField(
            model_name='advert',
            name='author',
            field=models.ForeignKey(on_delete=django.db.models.deletion.CASCADE, to='board.author'),
        ),
        migrations.AddField(
            model_name='advert',
            name='category',
            field=models.ManyToManyField(through='board.AdvertCategory', to='board.category'),
        ),
    ]