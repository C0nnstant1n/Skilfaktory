from django import template

register = template.Library()
# создаём список нехороших слов
BAD_WORDS = ('Редиск', 'редиск', 'Сука', 'сука', 'блядь', 'Блядь')


@register.filter()
# Проверяем встречаются ли в тексте слова из БЭД кортежа
def censor(text):
    for word in BAD_WORDS:
        if word in text:
            # подменяем плохие слова на *
            text = text.replace(word, (word[0] + ("*" * (len(word) - 1))))
    return text

