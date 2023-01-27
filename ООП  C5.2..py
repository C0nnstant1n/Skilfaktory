import requests
import json

r = requests.get('https://fish-text.ru/get?&type=paragraph&number=2')

d = json.loads(r.content)  # делаем из полученных байтов Python-объект для удобной работы

texts = d["text"]
text = texts.split("\\n\\n")
for i in text:
    print()
    a = len(i) // 90
    for k in range(a + 1):
        b = k * 90
        print(f"{i[b:b + 90]}")