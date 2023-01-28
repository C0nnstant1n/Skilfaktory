import redis

cache = redis.Redis(host="localhost", port=6379)


class PhoneBook:
    def __init__(self, name="1", phone=" "):
        self.name: str = name
        self.phone: str = phone

    def write_phone(self):
        cache.set(self.name, self.phone)
        print("Номер добавлен")

    def print_phone(self):
        self.phone = cache.get(self.name)
        _ = str(self.phone)
        print(self.name, _) if self.phone else print("Такого имени не сущемтвует")

    def delete_phone(self):
        cache.delete(self.name)
        print("Номер удален")


def input_data():
    data = input("Введите команду: ")
    l_comand = data.split()
    if len(l_comand) == 1:
        if l_comand[0] == "exit":
            return "exit"
        book = PhoneBook(l_comand[0])
        book.print_phone()

    elif len(l_comand) == 3:
        book = PhoneBook(l_comand[1], l_comand[2])
        if l_comand[0] == "write":
            book.write_phone()

    elif l_comand[0] == "delete":
        book = PhoneBook(l_comand[1])
        book.delete_phone()
    else:
        print("Неизвестная команда")
        input_data()


while input_data() != "exit":
    pass
