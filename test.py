import requests
import json
import redis
red = redis.Redis("localhost", 6379)

#res = requests.get('https://www.cbr-xml-daily.ru/daily_json.js')

res = json.loads(red.get("valutes"))

valutes = res.get("Valute")

for i in valutes:
    print(valutes[i]["CharCode"], valutes[i]["Name"], valutes[i]["Value"])



