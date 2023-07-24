from django.forms import ModelForm
from .models import Message


class CreateMessageForm(ModelForm):
    class Meta:
        model = Message
        fields = [
            'text',
            'author',
            'to'
        ]