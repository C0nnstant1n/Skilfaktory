from django import forms
from froala_editor.widgets import FroalaEditor


class AdvertForm(forms.ModelForm):
    content = forms.CharField(widget=FroalaEditor)
