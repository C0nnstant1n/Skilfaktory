from django_summernote.widgets import SummernoteWidget
from django import forms
from .models import Advert, Reply


class AdvertForm(forms.ModelForm):
    # Добавляем виджет от Summernote, в котором можно вставлять рисунки
    # и добавлять ссылки на видео или файлы
    content = forms.CharField(widget=SummernoteWidget())

    class Meta:
        model = Advert
        fields = [
            'title',
            'category',
            "content"
        ]


class ReplyForm(forms.ModelForm):
    class Meta:
        model = Reply
        fields = [
            'text',
        ]
