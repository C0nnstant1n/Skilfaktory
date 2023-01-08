class GameDesk:
    def __init__(self, w=6, h=6, logic=None):
        self.width: int = w
        self.height: int = h
        self.logic = logic
        self.game_desk = []
        self.game_desk = [['O'] * self.width for _ in range(self.height)]

    def get_game_desk(self):
        return self.game_desk

    def set_game_desk(self):
        self.game_desk[self.logic.get_x() - 1][self.logic.get_y()] = self.logic.get_x()

    def print_game_desk(self):
        s = []
        for i in range(self.width):
            s.append(i + 1)
        print(" ", *s)
        for i in range(self.height):
            print((i + 1), *GameDesk.get_game_desk(self)[i])


class Ship:
    def __init__(self, x, y, len_ship, line_ship):
        self.x = x
        self.y = y
        self.len_ship = len_ship
        self.line_ship = line_ship

    # def set_ship(self):
    #
    # def get_ship(self):

def input_coor(w, h):                               # Ввод координат и проверка ввода
    x_y_str = input("Введите координаты поля через пробел (Y X)")
    x_y = x_y_str.split()
    print(len(x_y))
    if len(x_y) == 2:
        for i in x_y:
            if not i.isdigit():                     # если строка содержит что то кроме цифр повторяем ввод
                print("Введите только цифры")
                return input_coor(w, h)
            else:
                x, y = map(int, x_y)
                if (0 <= x < h) and (0 <= y < w):
                    return x, y
                else:
                    print("Координаты за пределами поля")
                    return input_coor(w, h)
    else:
        return input_coor(w, h)


class Logic:
    def __init__(self, x=0, y=0):
        self.x = x
        self.y = y

    def get_x(self):
        return self.x

    def get_y(self):
        return self.y


h = 6
w = 6
print("Поле игрока")

logic = Logic(3, 3)
# print(logic.get_x())
field = GameDesk(6, 6, logic)
field.set_game_desk()
field.print_game_desk()
