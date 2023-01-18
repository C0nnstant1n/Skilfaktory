import random as rnd
from os import system, name

h, w = 6, 6


class Coordinates:
    def __init__(self, coordinates=(0, 0)):
        self.coordinates = coordinates
        self.possible_coordinates = []

    def set_coordinates(self, coordinates):
        self.coordinates = coordinates

    def get_coordinates(self):
        return self.coordinates

    def rand_coordinates(self, deck, line):
        # self.deck = deck
        # self.line = line
        if line:
            self.set_coordinates((rnd.randint(1, w), rnd.randint(1, (h - deck))))
        else:
            self.set_coordinates((rnd.randint(1, (w - deck)), rnd.randint(1, h)))
        return self.get_coordinates()

    def create_possble_coordinates(self):
        for i in range(1, w + 1):
            for k in range(1, h + 1):
                self.possible_coordinates.append((i, k))


class GameDesk:
    def __init__(self, w=6, h=6, pos=None, ch="  |"):
        self.width: int = w
        self.height: int = h
        self.pos = pos
        self.ch = ch
        self.game_desk = []
        self.game_desk = [["  |"] * self.width for _ in range(self.height)]

    def get_game_desk(self):
        return self.game_desk

    def set_game_desk(self, pos, ch):  # Записываем наш кораблик на игровое поле
        for i in pos:
            self.game_desk[i[1] - 1][i[0] - 1] = ch

    def print_game_desk(self, player, comp):
        s = []
        print("Поле игрока,", " " * 26, "Поле компьютера")
        print(f"кораблей уничтожено - {player.destroyed_ship}", " " * 15,
              f"кораблей уничтожено - {comp.destroyed_ship}")
        print()
        for i in range(self.width):
            s.append(i + 1)
            s.append("|")
        print(" ", "|", *s, " " * 10, " ", "|", *s, )
        for i in range(self.height):
            print("-" * 27, " " * 10, "-" * 27)
            print((i + 1), "|", *player.game_desk[i], " " * 10, (i + 1), "|", *comp.game_desk[i])
        print()


class Ship:
    def __init__(self, point=None, deck=0, orientation=0):
        self.point = point  # Стартовые координаты
        self.deck = deck  # Количество палуб корабля
        self.position = []  # Список координат корабля
        self.orientation = orientation  # Ориентация корабля
        self.shadow = []  # Тень корабля (нужна чтобы отделить корабли друг от друга)
        self.ships = []  # Список координат множества кораблей
        self.lships = []

    def set_pos(self):
        self.point = self.point

    def set_position(self):  # Записываем координаты корабля в список для вывода на экран
        self.position.append(self.point)
        if self.deck == 0:
            return self.position
        elif self.orientation == 0:
            for i in range(self.deck - 1):
                self.position.append((self.point[0] + 1 + i, self.point[1]))
        elif self.orientation == 1:
            for i in range(self.deck - 1):
                self.position.append((self.point[0], (self.point[1] + 1 + i)))

    def shadow_ship(self):  # тень нужна чтобы корабли создавались на расстоянии от текушего корабля
        mask = (-1, 0), (-1, 1), (0, -1), \
            (0, 0), (0, 1), (1, 0)
        for j in self.get_position():
            for i in mask:
                c = map(sum, zip(i, j))
                self.shadow.append(tuple(c))
        shadow_get = set(self.shadow)
        return shadow_get

    def get_position(self):
        return self.position

    def gen_ship(self, deck):
        rand = Coordinates()
        line = rnd.randint(0, 1)
        ship = Ship(rand.rand_coordinates(deck, line), deck, line)
        ship.set_position()
        return ship

    def gen_ships(self):
        ship_3d = self.gen_ship(3)
        shadows = []

        self.ships.append(ship_3d)
        shadows += ship_3d.shadow_ship()

        ship_2d = self.gen_ship(2)
        for i in range(2):
            pos = set(ship_2d.get_position())
            while pos.intersection(shadows):
                ship_2d = self.gen_ship(2)
                pos = set(ship_2d.get_position())
            self.ships.append(ship_2d)
            shadows += ship_2d.shadow_ship()

        ship_1d = self.gen_ship(1)
        for i in range(4):
            pos = set(ship_1d.get_position())
            while pos.intersection(shadows):
                ship_1d = self.gen_ship(1)
                pos = set(ship_1d.get_position())
            self.ships.append(ship_1d)
            shadows += ship_1d.shadow_ship()

        for i in self.ships:
            self.position += i.position

    def get_ships(self):
        return self.position


class GameLogic:
    def __init__(self, w=6, h=6, ships=None, coordinates=None):
        self.width = w
        self.height = h
        self.ships = ships
        self.coordinates = coordinates

    # Нахождение попадания
    def hit_ship(self, ships, coordinates):
        if coordinates in ships:
            return True
        else:
            return False

    # Проверка уничтожкния корабля
    def is_destroyed(self, user, coordinates):
        n = 0
        for i in user.ships:
            if coordinates in i.position:
                i.position.remove(coordinates)
            if not i.position:
                user.ships.pop(n)
                return True
            n += 1
        return False

    # # Проверка количества оставшихся кораблей


class GameEvent:
    def __init__(self, player, comp):
        self.player = player
        self.comp = comp
        self.coordinates = Coordinates()
        self.coordinates.create_possble_coordinates()
        self.possible_coordinates = self.coordinates.possible_coordinates.copy()
        self.logic = GameLogic()

        # ход игрока

    def player_step(self):
        x_y_str = input("Введите координаты поля через пробел (X Y)")
        x_y = x_y_str.split()
        self.coordinates = []
        if len(x_y) == 2:
            for i in x_y:
                if not i.isdigit():  # если строка содержит что то кроме цифр повторяем ввод
                    print("Введите только цифры")
                    return self.player_step()
                else:
                    if (0 < int(i) <= h) and (0 < int(i) <= w):
                        self.coordinates.append(int(i))
                    else:
                        print("Координаты за пределами поля")
                        return self.player_step()
        else:
            return self.player_step()
        return self.coordinates

        # ход компьютера

    def comp_step(self):
        b = len(self.possible_coordinates) - 1
        a = rnd.randint(0, b)
        self.coordinates = self.possible_coordinates.pop(a)
        return self.coordinates

    def player_turn(self):
        try:
            x_y = self.player_step()
            if self.comp.game_desk[x_y[1] - 1][x_y[0] - 1] != "  |":
                raise ErrorInput("Такой ход уже был")
        except ErrorInput as e:
            print(e)
            self.player_turn()

        if self.logic.hit_ship(self.comp.get_ships(), tuple(self.coordinates)):
            self.comp.set_game_desk([self.coordinates], "X |")
            if self.logic.is_destroyed(self.comp, tuple(self.coordinates)):
                comp.destroyed_ship += 1
                self.game_pass()
                print("Корабль уничтожен, ход игрока")
                if not comp.ships:
                    raise Win("Игрок выиграл")
            else:
                self.game_pass()
                print("Попадание")
            return True
        else:
            self.comp.set_game_desk([self.coordinates], "T |")
            self.game_pass()


            return False

    def comp_turn(self):
        hit = tuple(self.comp_step())
        if self.logic.hit_ship(self.player.get_ships(), hit):
            self.player.set_game_desk([self.coordinates], "X |")
            if self.logic.is_destroyed(self.player, tuple(self.coordinates)):
                player.destroyed_ship += 1
                self.game_pass()
                print("Компьютер стреляет по координатам - ", hit)
                print("Корабль уничтожен, ход компьютера")
                if not player.ships:
                    raise Win("Компьютер выиграл")
            else:
                self.game_pass()
                print("Компьютер стреляет по координатам - ", hit)
                print("Попадание")
            return True
        else:
            self.player.set_game_desk([self.coordinates], "T |")
            self.game_pass()
            print("Компьютер стреляет по координатам - ", hit)
            return False

    def game_pass(self):
        if name == 'nt':  # for windows
            _ = system('cls')
        else:  # for mac and linux(here, os.name is 'posix')
            _ = system('clear')
        print("-" * 66)
        print("Игра \"Морской бой\"")
        print("-" * 66, "\n")
        self.player.print_game_desk(player, comp)


class GameException(Exception):
    def __int__(self, message):
        super().__init__(message)


class Win(GameException):
    def __int__(self, message):
        super().__init__()


class ErrorInput(GameException):
    def __init__(self, message):
        super().__init__(message)


class User(GameDesk, Ship):
    def __init__(self, w, h):
        super().__init__(w, h)
        self.destroyed_ship = 0
        self.ships = []
        self.position = []
        Ship.gen_ships(self)



if __name__ == '__main__':
    player = User(w, h)
    comp = User(w, h)
    event = GameEvent(player, comp)
    player.set_game_desk(player.get_position(), "# |")
    event.game_pass()

    while True:
        try:
            while event.player_turn():
                pass
        except Win as e:
            print("ПОБЕДА !!!")
            print(e)
            break
        print("Промах")
        print("Ход компьютера")
        _ = input("для продолжения нажмите Enter")

        try:
            while event.comp_turn():
                print("Ход Компьютера")
                _ = input("для продолжения нажмите Enter")
        except Win as e:
            print("Поражение")
            print(e)
            break
            print("Промах")