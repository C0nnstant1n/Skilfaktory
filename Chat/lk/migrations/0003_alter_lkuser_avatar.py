# Generated by Django 4.2.3 on 2023-07-22 13:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('lk', '0002_alter_lkuser_avatar'),
    ]

    operations = [
        migrations.AlterField(
            model_name='lkuser',
            name='avatar',
            field=models.ImageField(default='uploads/default_avatar.png', upload_to='uploads/'),
        ),
    ]
