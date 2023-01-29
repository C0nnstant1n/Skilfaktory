import telebot

***REMOVED***
bot = telebot.TeleBot(TOKEN)


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
    exchange = {"доллар": "USD",
                "Рубль": "RUB",
                "евро": "EUR",
                "биткоин": "BTC"}
    bot.send_message(message.chat.id, ", ".join(exchange.keys()))


@bot.message_handler(content_types=["photo"])
def get_photo(message):
    bot.reply_to(message, f"Прикольный мем")


bot.polling(none_stop=True)
