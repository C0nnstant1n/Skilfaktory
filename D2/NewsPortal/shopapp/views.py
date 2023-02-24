from django.shortcuts import render

# Create your views here.
from models import Product

keyboard = Product.objects.create(name='Клавиатура', price=1060)
utf_cable = Product(name='витая пара (3 м.)', price=993)
utf_cable.save()
