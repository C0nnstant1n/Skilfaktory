from django import forms
from .models import LkUser


class EditLkForm(forms.ModelForm):
    class Meta:
        model = LkUser
        fields = {'avatar'}
