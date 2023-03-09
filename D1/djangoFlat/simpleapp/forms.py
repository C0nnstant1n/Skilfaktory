from django import forms
from django.core.exceptions import ValidationError
from .models import Product


class ProductForm(forms.ModelForm):
    class Meta:
        model = Product
        fields = [
           'name',
           'description',
           'quantity',
           'category',
           'price', ]

    def clean(self):
        cleaned_data = super().clean()
        price = cleaned_data.get('price')
        print(cleaned_data)
        if price < 0:
            print(cleaned_data)
            raise ValidationError({'price': "цена не может быть ниже 0"})
        return cleaned_data
