from django import forms
from froala_editor.widgets import FroalaEditor
from .models import Advert


class AdvertForm(forms.ModelForm):
    content = forms.CharField(widget=FroalaEditor)

    class Meta:
        model = Advert
        fields = [
            'title',
            'category',
        ]
