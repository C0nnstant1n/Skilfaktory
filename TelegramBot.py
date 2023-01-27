import telebot

***REMOVED***
bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=['start', 'help'])
def send_welcome(message):
    bot.reply_to(message, f"Привет, {message.chat.username}")


@bot.message_handler(content_types=["text"])
def function_name(message):
    print(message.chat.id)
    print(message.chat.username)
    print(message.text)
    bot.send_message(message.chat.id, message.text)


@bot.message_handler(content_types=["photo"])
def get_photo(message):
    bot.reply_to(message, f"Прикольный мем")


bot.polling(none_stop=True)
