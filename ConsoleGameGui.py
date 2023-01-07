class GameDesk:
    def __init__(self, w=0, h=0, logic=None):
        self.width = w
        self.height = h
        self.logic = logic
        self.game_desk = []

    def get_game_desk(self):
        return self.game_desk

    def set_game_desk(self, width, height):
        self.game_desk = [['-'] * width for _ in range(height)]


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


h = 5
w = 11
s = []
# game = GameDesk()
# game.set_game_desk(w, h)
# for i in range(w):
#     s.append(i)
# print(" ", *s)
# for i in range(h):
#     print(i, *game.get_game_desk()[i])
x, y = input_coor(w, h)
print(x, y)
