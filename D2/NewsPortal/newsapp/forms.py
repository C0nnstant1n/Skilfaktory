from django import forms
# from django.core.exceptions import ValidationError
from .models import Post

# следует добавить проверку на количество знаков, но в учебном проекте
# этого делать не стоит - замучаешься еще и посты придумывать или копипастить )))


class NewsForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title',
            'post_text',
            'category',
        ]


class ArticleForm(forms.ModelForm):
    class Meta:
        model = Post
        fields = [
            'title',
            'post_text',
            'category',
        ]
