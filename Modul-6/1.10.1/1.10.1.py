class Krug:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

    def __str__(self):
        return f'Circle: {self.x}, {self.y}, {self.radius}'

    def get_area(self): # Задание 1.10.2
        return print((self.radius ** 2) * 3.14)


c1 = Krug(5, 5, 10)
print(c1)
c1.get_area()
