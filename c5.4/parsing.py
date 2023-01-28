import lxml.html
import requests  # импортируем наш знакомый модуль
from lxml import etree

html = requests.get('https://www.python.org/').content
# получим html главной странички официального сайта python
# создадим объект ElementTree. Он возвращается функцией parse()
tree = etree.parse(html, lxml.html.HTMLParser())
# попытаемся спарсить наш файл с помощью html-парсера.
# Сам html - это то, что мы скачали и поместили в папку из браузера.

ul = tree.findall('/body/div/div[3]/div/section/div[2]/div[1]/div/ul/li')
# помещаем в аргумент метода findall скопированный xpath. Здесь мы получим все
# элементы списка новостей. (Все заголовки и их даты)

# создаём цикл, в котором мы будем выводить название каждого элемента из списка
for li in ul:
    a = li.find('a')  # в каждом элементе находим, где хранится заголовок новости.
    # У нас это тег <a>. Т. е. гиперссылка, на которую нужно нажать,
    # чтобы перейти на страницу с новостью. (Гиперссылки в html это всегда тэг <a>)
    time = li.find("time")
    date = str(time.get("datetime"))
    print(a.text, date[:10:])


