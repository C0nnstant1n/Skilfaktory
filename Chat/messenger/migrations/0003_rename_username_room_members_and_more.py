# Generated by Django 4.2.3 on 2023-07-29 14:05

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('messenger', '0002_rename_user_room_username_remove_roommembers_user_and_more'),
    ]

    operations = [
        migrations.RenameField(
            model_name='room',
            old_name='username',
            new_name='members',
        ),
        migrations.RenameField(
            model_name='roommembers',
            old_name='username',
            new_name='user',
        ),
    ]