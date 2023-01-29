import requests

r = requests.get('https://developer.bps-sberbank.by/api/rates/v1/currencyExchange?exchangeType=Online')  # делаем запрос на сервер по переданному адресу
print(r.content)