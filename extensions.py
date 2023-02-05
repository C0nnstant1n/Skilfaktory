import requests
import json
from config import CACHE


class ConvertException(Exception):  # Создаем класс исключений
    pass


class Currency:
    def __init__(self):
        self.resource = {}
        self.update_currency()

    def update_currency(self):  # Обновляем данные по валютам с сайта
        # это конечно не совсем API тем не менее данные получены в формате JSON
        # работа с api сайта из примера мне понятна, но хотелось взять курсы из наших, отечественных источников
        # кроме того этот метод не требует регистрации
        self.resource = requests.get('https://www.cbr-xml-daily.ru/daily_json.js')
        self.resource = json.loads(self.resource.content)
        CACHE.set("valutes", json.dumps(self.resource))  # Записываем валюты в кэш

    def get_currency(self):  # Получаем данные по валютам из кэша
        self.resource = json.loads(CACHE.get("valutes"))
        return self.resource.get("Valute")

    def get_date(self):
        return self.resource.get("Date")


class Convert:
    @staticmethod
    def get_price(quote: str, base: str, amount: str):
        try:
            amount = int(amount)
        except ValueError:
            raise ConvertException(f"Не удалось обработать количество - {amount}")

        currency_dict = json.loads(CACHE.get("valutes")).get("Valute")  # Получаем словарь валют

        available_currencies = {"Рубль": "RUB"}
        # Инвертируем значение в ключ,
        # так как словарь валют(currency_dict) имеет вид "USD": "Доллар США"
        # нам же нужно обратное
        for i in currency_dict:
            available_currencies[(currency_dict[i]["Name"])] = i

        a = quote
        quote = available_currencies.get(quote)
        if not quote:
            raise ConvertException(f"Не удалось найти валюту - {a}")
        a = base
        base = available_currencies.get(base)
        if not base:
            raise ConvertException(f"Не удалось найти валюту - {a}")

        if quote == "RUB":
            result = str(round((currency_dict[base]["Value"] / currency_dict[base]["Nominal"] * amount), 2))
            return result
        if base == "RUB":
            result = str(round(((1 / (currency_dict[quote]["Value"] / currency_dict[quote]["Nominal"])) * amount), 2))
            return result

        price_quote = (currency_dict[quote]["Value"] / currency_dict[quote]["Nominal"])  # Цена валюты в рублях
        price_base = (currency_dict[base]["Value"] / currency_dict[base]["Nominal"])
        result = round((price_base / price_quote) * amount, 2)
        return result
