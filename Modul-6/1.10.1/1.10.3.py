class User:
    def __init__(self, name, second_name, city, cash):
        self.name = name
        self.second_name = second_name
        self.city = city
        self.cash = cash

    def __str__(self):
        return f"{self.name} {self.second_name}. {self.city}. Баланс: {self.cash} руб."

    def user_info(self):
        return f"{self.name} {self.second_name}. {self.city}."


user1 = User("Иван", "Петров", "Москва", 50)
user2 = User("Пётр", "Иванов", "Серпухов", 1020)
user3 = User("Василий", "Иванов", "Серпухов", 3020)
# print(user1)

guest_list = [user1, user2, user3]
for guest in guest_list:
    print(guest.user_info())
