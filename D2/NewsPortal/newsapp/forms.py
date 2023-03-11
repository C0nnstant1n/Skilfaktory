from django import forms
from django.core.exceptions import ValidationError
from .models import Post


class NewsForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title',
            'post_text',
            'author',
            'category',
        ]

        def clean(self):
            cleaned_data = super().clean()
            return cleaned_data


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title',
            'post_text',
            'author',
            'category',
        ]

        def clean(self):
            cleaned_data = super().clean()
            return cleaned_data
