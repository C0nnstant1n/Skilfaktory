import requests
import json
import redis
red = redis.Redis("localhost", 6379)

# res = requests.get('https://www.cbr-xml-daily.ru/daily_json.js')
# res = json.loads(res.content)

#
# red.set("valutes", json.dumps(res))

res = json.loads(red.get("valutes"))
valutes = res.get("Valute")
date = json.loads(red.get("valutes")).get("Date")
print(f"Последнее обновление курсов  {date[:10]}, {date[11:16]}, время Московское")


# for i in valutes:
#     print(valutes[i]["CharCode"], valutes[i]["Name"],
#           round((valutes[i]["Value"] / valutes[i]["Nominal"]), 2))


