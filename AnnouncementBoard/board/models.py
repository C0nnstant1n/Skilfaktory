from django.db import models
from django.contrib.auth.models import User
from django.urls import reverse


class Advert(models.Model):
    TYPE = (
        ('tank', 'Танки'),
        ('heal', 'Хилы'),
        ('dd', 'ДД'),
        ('buyers', 'Торговцы'),
        ('guildmaster', 'Гилдмастеры'),
        ('quest', 'Квестгиверы'),
        ('smith', 'Кузнецы'),
        ('tanner', 'Кожевенники'),
        ('potion', 'Зельевары'),
        ('spellmaster', 'Мастера заклинаний'),
    )
    title = models.CharField(max_length=64)
    content = models.TextField()
    author = models.OneToOneField(User, on_delete=models.CASCADE)
    category = models.CharField(max_length=16, choices=TYPE, default='dd')

    def __str__(self):
        return f"{self.title[:16]}"

    def get_absolute_url(self):
        return reverse('advert', args=[str(self.pk)])


class File(models.Model):
    upload = models.FileField(upload_to='uploads/')
    advert = models.OneToOneField(Advert, on_delete=models.CASCADE)


class Reply(models.Model):
    text = models.TextField()
    advert = models.ForeignKey(Advert, on_delete=models.CASCADE)
    author = models.ForeignKey(User, on_delete=models.CASCADE)
    status = models.BooleanField(default=False)

    def __str__(self):
        return f"{self.author} - {self.text[:20]}"

    def get_absolute_url(self):
        return reverse('advert', args=[self.advert.id])
