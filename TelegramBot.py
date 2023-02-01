import telebot
from extensions import Currency
from config import TOKEN


bot = telebot.TeleBot(TOKEN)
valutes = Currency()


@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, f"Привет, {message.chat.username}")
    bot.send_message(message.chat.id, "Чтобы узнать обменный курс отправьте сообщение боту"
                                      " в виде <имя валюты,"
                                      " цену которой вы хотите узнать> <имя валюты,"
                                      " в которой надо узнать цену первой валюты>"
                                      " <количество первой валюты>\n Чтобы узнать список доступных валют"
                                      " отправьте /exchange")
    print("def send_welcome(message)")


@bot.message_handler(commands=["exchange"])
def exchange_list(message):

    available_currencies = {}
    currency_dict = valutes.get_currency()
    date = valutes.get_date()

    available_currencies["USD"] = currency_dict.get("USD").get("Name")
    available_currencies["EUR"] = currency_dict.get("EUR").get("Name")
    available_currencies["JPY"] = currency_dict.get("JPY").get("Name")
    available_currencies["RUB"] = "Рубль"
    bot.send_message(message.chat.id, "\n".join(available_currencies.values()))
    bot.send_message(message.chat.id, f"Последнее обновление курсов\n{date[:10]},"
                                      f" {date[11:16]}\nвремя Московское")
    print("def exchange_list(message)")


@bot.message_handler(content_types=["text"])
def convert(message):
    quote, base, amount = message.text.split(' ')
    bot.send_message(message.chat.id,
                     f"{amount} {base} стоит {valutes.get_price(quote, base, amount)} {quote}")


@bot.message_handler(content_types=["photo"])
def get_photo(message):
    bot.reply_to(message, f"Прикольный мем")
    print("def get_photo(message)")


bot.polling()
