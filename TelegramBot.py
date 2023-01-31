import requests
import json
import telebot
import redis

***REMOVED***
bot = telebot.TeleBot(TOKEN)
red = redis.Redis("localhost", 6379)


def update_currency():  # Обновляем данные по валютам с сайта
    res = requests.get('https://www.cbr-xml-daily.ru/daily_json.js')
    res = json.loads(res.content)
    red.set("valutes", json.dumps(res))     # Записываем валюты в кэш


def get_currency():     # Получаем данные по валютам из кэша
    res = json.loads(red.get("valutes"))
    valutes = res.get("Valute")
    return valutes


@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, f"Привет, {message.chat.username}")
    bot.send_message(message.chat.id, "Чтобы узнать обменный курс отправьте сообщение боту"
                                      " в виде <имя валюты,"
                                      " цену которой вы хотите узнать> <имя валюты,"
                                      " в которой надо узнать цену первой валюты>"
                                      " <количество первой валюты>\n Чтобы узнать список доступных валют"
                                      " отправьте /exchange")


@bot.message_handler(commands=["exchange"])
def exchange_list(message):
    currency_dict = {}
    valutes = get_currency()
    date = json.loads(red.get("valutes")).get("Date")

    for i in valutes:
        currency_dict[valutes[i]['CharCode']] = valutes[i]['Name']
    bot.send_message(message.chat.id, "\n".join(currency_dict.values()))
    bot.send_message(message.chat.id, f"Последнее обновление курсов\n{date[:10]}, {date[11:16]}\nвремя Московское")


@bot.message_handler(content_type=['text', ])
def convert(message: telebot.types.Message):
    pass


@bot.message_handler(content_types=["photo"])
def get_photo(message):
    bot.reply_to(message, f"Прикольный мем")


bot.polling(none_stop=True)
