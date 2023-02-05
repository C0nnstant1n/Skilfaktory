import redis

TOKEN = "xxxxxxx" # тут должен быть токен от телеграм бота
CACHE = redis.Redis("localhost", 6379)
