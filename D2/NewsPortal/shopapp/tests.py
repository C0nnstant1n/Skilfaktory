from django.test import TestCase
from models import Product
# Create your tests here.
keyboard = Product.objects.create(name='Клавиатура', price=1060)
utf_cable = Product(name='витая пара (3 м.)', price=993)
utf_cable.save()
