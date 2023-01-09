class Coordinates:
    def __init__(self, coordinates=(0, 0)):
        self.coordinates = coordinates

    def set_coordinates(self, coordinates):
        self.coordinates = coordinates

    def get_coordinates(self):
        return self.coordinates


class GameDesk:
    def __init__(self, w=6, h=6, pos=None, ch="#"):
        self.width: int = w
        self.height: int = h
        self.pos = pos
        self.ch = ch
        self.game_desk = []
        self.game_desk = [['-'] * self.width for _ in range(self.height)]

    def get_game_desk(self):
        return self.game_desk

    def set_game_desk(self, pos, ch):
        for i in pos:
            self.game_desk[i[1]-1][i[0]-1] = ch

    def print_game_desk(self):
        s = []
        for i in range(self.width):
            s.append(i + 1)
        print(" ", *s)
        for i in range(self.height):
            print((i + 1), *GameDesk.get_game_desk(self)[i])


class Ship:
    def __init__(self, pos, len_ship=0, line_ship=0):
        self.x = 0
        self.y = 0
        self.set_pos(pos)
        self.len_ship = len_ship
        self.ship_position = []
        self.line_ship = line_ship
        self.shadow = []

    def set_pos(self, pos):
        self.x = pos[0]
        self.y = pos[1]

    def ship_coordinates(self):
        self.ship_position = [(self.x, self.y)]
        if self.len_ship == 0:
            return self.ship_position
        elif self.line_ship == 0:
            for i in range(self.len_ship - 1):
                self.ship_position.append(((self.x + 1 + i), self.y))
        elif self.line_ship == 1:
            for i in range(self.len_ship - 1):
                self.ship_position.append((self.x, (self.y + 1 + i)))
        return self.ship_position

    def shadow_ship(self):
        shadow = []
        for i in self.ship_coordinates():
            shadow += (i[0], i[1]), (i[0], i[1])
            shadow += (i[0] - 1, i[1] - 1), (i[0] - 1, i[1] + 1)
            shadow += (i[0] + 1, i[1] + 1), (i[0] + 1, i[1] + 1)
            shadow += (i[0] - 1, i[1] + 1), (i[0] + 1, i[1] - 1)
            shadow += (i[0], i[1] + 1), (i[0], i[1] - 1)
            shadow += (i[0] + 1, i[1]), (i[0]+1, i[1])
            shadow += (i[0] - 1, i[1]), (i[0], i[1] - 1)
        return shadow


def input_coor(w, h):                               # Ввод координат и проверка ввода
    x_y_str = input("Введите координаты поля через пробел (Y X)")
    x_y = x_y_str.split()
    list_coordinates = []
    if len(x_y) == 2:
        for i in x_y:
            if not i.isdigit():                     # если строка содержит что то кроме цифр повторяем ввод
                print("Введите только цифры")
                return input_coor(w, h)
            else:
                if (0 < int(i) < h) and (0 < int(i) < w):
                    list_coordinates.append(int(i))
                else:
                    print("Координаты за пределами поля")
                    return input_coor(w, h)
    else:
        return input_coor(w, h)
    return list_coordinates


h = 6
w = 6
print("Поле игрока")

game = GameDesk()
ship_1 = Ship([2, 3], 1, 0)
#ship_3 = Ship([4, 3], 2, 1)
#print(ship_1.shadow_ship())
game.set_game_desk(ship_1.shadow_ship(), "o")
game.set_game_desk(ship_1.ship_coordinates(), "#")


#game.set_game_desk(ship_3.ship_coordinates(), "#")
game.print_game_desk()
print("")


# print(ship_1.shadow_ship())
#
# s = set(ship_1.ship_coordinates())
# s2 = set(ship_3.shadow_ship())
# print(True) if s.intersection(s2) else print(False)
