import requests
import json
import redis
red = redis.Redis("localhost", 6379)

# res = requests.get('https://www.cbr-xml-daily.ru/daily_json.js')
# res = json.loads(res.content)
currency_dict = {}
#
# red.set("valutes", json.dumps(res))

res = json.loads(red.get("valutes"))
valutes = res.get("Valute")
date = json.loads(red.get("valutes")).get("Date")
print(f"Последнее обновление курсов  {date[:10]}, {date[11:16]}, время Московское")
#print(valutes)
currency_dict[valutes["USD"]['CharCode']] = valutes["USD"]['Name']
currency_dict[valutes["EUR"]['CharCode']] = valutes["EUR"]['Name']
currency_dict[valutes["JPY"]['CharCode']] = valutes["JPY"]['Name']
currency_dict["RUB"] = "Рубль"
print(currency_dict)
# for i in valutes:
#     print(valutes[i]["CharCode"], valutes[i]["Name"],
#           round((valutes[i]["Value"] / valutes[i]["Nominal"]), 2))


