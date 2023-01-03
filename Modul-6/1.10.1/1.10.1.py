class Krug:
    def __init__(self, x, y, radius):
        self.x = x
        self.y = y
        self.radius = radius

    def __str__(self):
        return f'Circle: {self.x}, {self.y}, {self.radius}'


c1 = Krug(5, 5, 10)
print(c1)
