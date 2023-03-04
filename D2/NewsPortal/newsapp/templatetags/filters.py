from django import template

register = template.Library()
# создаём список нехороших слов
BAD_WORDS = ('Редиск', 'редиск', 'Сука', 'сука', 'блядь', 'Блядь')


@register.filter()
# censor проверяет, встречаются ли в тексте слова из БЭД кортежа
def censor(text):
    # проверяем является ли text строкой
    if type(text) is not str:
        raise TypeError(f"фильтр не может принять  {type(text)}, только <str>")
    for word in BAD_WORDS:
        if word in text:
            # подменяем плохие слова на *
            text = text.replace(word, (word[0] + ("*" * (len(word) - 1))))
    return text

