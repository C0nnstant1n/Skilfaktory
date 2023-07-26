from django.forms import ModelForm
from .models import Room


class CreateMessageForm(ModelForm):
    class Meta:
        model = Room
        fields = [
            'name',
            'members',
        ]
