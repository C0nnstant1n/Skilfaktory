class Queue:
    # Конструктор нашего класса, в нём происходит нужная инициализация объекта
    def __init__(self, max_size):
        self.max_size = max_size  # размер очереди
        self.task_num = 0  # будем хранить сквозной номер задачи

        self.tasks = [0 for _ in range(self.max_size)]  # инициализируем список с нулевыми элементами
        self.head = 0  # указатель на начало очереди
        self.tail = 0  # указатель на элемент следующий за концом очереди

    def is_empty(self):
        return self.head == self.tail and self.tasks[self.head] == 0

    def size(self):
        if self.is_empty():
            return 0
        elif self.head == self.tail:
            return self.max_size
        elif self.head > self.tail:
            return self.max_size - self.head + self.tail
        else:
            return self.tail - self.head

    def add(self):
        self.task_num += 1
        self.tasks[self.tail] = self.task_num
        print(f"Задача №{self.tasks[self.tail]} добавлена")
        self.tail = (self.tail + 1) % self.max_size

    def show(self):
        print(f"Задача №{self.tasks[self.head]} в приоритете")

    def do(self):
        print(f"Задача №{self.tasks[self.head]} выполнена")
        self.tasks[self.head] = 0
        self.head = (self.head + 1) % self.max_size

# Используем класс
size = int(input("Определите размер очереди: "))
q = Queue(size)

while True:
    cmd = input("Введите команду:")
    if cmd == "empty":
        if q.is_empty():
            print("Очередь пустая")
        else:
            print("В очереди есть задачи")
    elif cmd == "size":
        print("Количество задач в очереди:", q.size())
    elif cmd == "add":
        if q.size() != q.max_size:
            q.add()
        else:
            print("Очередь переполнена")
    elif cmd == "show":
        if q.is_empty():
            print("Очередь пустая")
        else:
            q.show()
    elif cmd == "do":
        if q.is_empty():
            print("Очередь пустая")
        else:
            q.do()
    elif cmd == "exit":
        for _ in range(q.size()):
            q.do()
        print("Очередь пустая. Завершение работы")
        break
    else:
        print("Введена неверная команда")