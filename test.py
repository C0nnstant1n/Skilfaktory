import requests
import json
import telebot
from extensions import Currency
from config import TOKEN
from config import CACHE
available_currencies = {}
valutes = Currency()
currency_dict = valutes.get_currency()
date = valutes.resource.get("Date")
amount = "22"
quote = "Рубль"
base = "Доллар США"
print(f"{amount} {base} стоит {valutes.get_price(quote, base, amount)} {quote}")








# print(currency_dict[quote]["Name"], currency_dict[quote]["Value"])
# price_quote = round((currency_dict[quote]["Value"] / currency_dict[quote]["Nominal"]), 2)
# print(price_quote)
#
# base = "Евро"
# print(currency_dict[base]["Name"], currency_dict[base]["Value"])
# price_base = round((currency_dict[base]["Value"] / currency_dict[base]["Nominal"]), 2)
# print(price_base)
#
# c = round((price_quote / price_base) * amount, 2)
# print(c)
