import lxml.html
import requests  # импортируем наш знакомый модуль
from lxml import etree

html = requests.get('https://www.python.org/').content

tree = etree.parse('Welcome to Python.org.html', lxml.html.HTMLParser())


ul = tree.findall('/body/div/div[3]/div/section/div[2]/div[1]/div/ul/li')

# создаём цикл, в котором мы будем выводить название каждого элемента из списка
for li in ul:
    a = li.find('a')  # в каждом элементе находим, где хранится заголовок новости.
    # У нас это тег <a>. Т. е. гиперссылка, на которую нужно нажать,
    # чтобы перейти на страницу с новостью. (Гиперссылки в html это всегда тэг <a>)
    time = li.find("time")
    date = str(time.get("datetime"))
    print(a.text, date[:10:])


