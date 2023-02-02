import telebot
import extensions
from config import TOKEN

val = extensions.Currency()
bot = telebot.TeleBot(TOKEN)


@bot.message_handler(commands=['start', 'help'])  # Справка по работе бота
def send_welcome(message):
    bot.reply_to(message, f"Привет, {message.chat.username}")
    bot.send_message(message.chat.id, "Чтобы узнать обменный курс отправьте сообщение боту"
                                      " в виде\n<имя валюты, в которую будем переводить>,\n"
                                      "<имя валюты, из которой переводим>>,\n"
                                      "<количество переводимой валюты>\n Параметры следует указывать"
                                      " через запятую с пробелом\n\nНапример: Доллар США, Евро, 150\n\n"
                                      "Параметры критичны к регистру и склонению, указывать следует"
                                      " так, как написано в справке\n\n"
                                      "Основные валюты:\nРубль\nДоллар США\nЕвро\nКитайский юань\n\n"
                                      "Курсы валют предоставлены Центральным Банком России\n\n"
                                      "Чтобы узнать список доступных валют"
                                      " отправьте /values\n\nДля обновления кэша отправьте /update")


@bot.message_handler(commands=["values"])  # Список доступных валют
def exchange_list(message):
    available_currencies = {"RUB": "Рубль"}
    currency_dict = val.get_currency()
    date = val.get_date()

    for i in currency_dict:
        available_currencies[i] = currency_dict.get(i).get("Name")

    bot.send_message(message.chat.id, "\n".join(available_currencies.values()))
    bot.send_message(message.chat.id, f"Последнее обновление курсов\n{date[:10]},"
                                      f" {date[11:16]}\nвремя Московское")


@bot.message_handler(commands=["update"])  # Обновление кэша
def exchange_list(message):
    val.update_currency()
    bot.reply_to(message, "Данные в кэше обновлены")


@bot.message_handler(content_types=["text"])  # Обработка сообщений пользователя
def convert(message):
    try:
        params = message.text.split(', ')  # Так как названия валют могут состоять из нескольких слов
        # разделть будем по запятой с пробелом
        if len(params) != 3:
            raise extensions.ConvertException("Неверное количество параметров.")

        quote, base, amount = params
        result_exchanges = extensions.Convert.get_price(quote, base, amount)
    except extensions.ConvertException as e:
        bot.reply_to(message, f"Ошибка пользователя\n{e}")
    except Exception as e:
        bot.reply_to(message, f"Не удалось обработать команду\n{e}")
    else:
        bot.send_message(message.chat.id, f"{amount} {base} стоит "
                                          f"{result_exchanges} {quote}")


bot.polling()
