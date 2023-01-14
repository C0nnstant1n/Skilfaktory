import random as rnd
h, w = 6, 6


class Coordinates:
    def __init__(self, coordinates=(0, 0)):
        self.coordinates = coordinates
        self.possible_coordinates = []

    def set_coordinates(self, coordinates):
        self.coordinates = coordinates

    def get_coordinates(self):
        return self.coordinates

    def rand_coordinates(self, len, line):
        self.len = len
        self.line = line
        if line:
            self.set_coordinates((rnd.randint(1, w), rnd.randint(1, (h - self.len))))
        else:
            self.set_coordinates((rnd.randint(1, (w - self.len)), rnd.randint(1, h)))
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

    def set_game_desk(self, pos, ch):               # Записываем наш кораблик на игровое поле
        for i in pos:
            self.game_desk[i[1]-1][i[0]-1] = ch

    def print_game_desk(self):
        s = []
        for i in range(self.width):
            s.append(i + 1)
            s.append("|")
        print(" ", "|", *s)
        for i in range(self.height):
            print("---------------------------")
            print((i + 1), "|",  *GameDesk.get_game_desk(self)[i])


class Ship:
    def __init__(self, pos=None, len_ship=0, line_ship=0):
        self.pos = pos
        self.len_ship = len_ship
        self.ship_position = []
        self.line_ship = line_ship
        self.shadow = []
        self.ships = []

    def set_pos(self, pos):
        self.pos = pos
        return self.pos

    def set_ship_coordinates(self):
        self.ship_position.append(self.pos)
        if self.len_ship == 0:
            return self.ship_position
        elif self.line_ship == 0:
            for i in range(self.len_ship - 1):
                self.ship_position.append((self.pos[0] + 1 + i, self.pos[1]))
        elif self.line_ship == 1:
            for i in range(self.len_ship - 1):
                self.ship_position.append((self.pos[0], (self.pos[1] + 1 + i)))
        return self.ship_position

    def shadow_ship(self):                      # тень нужна чтобы корабли создавались на расстоянии от текушего корабля
        mask = (-1, 0), (-1, 1), (0, -1), \
            (0, 0), (0, 1), (1, 0)
        for j in self.get_ship_coordinates():
            for i in mask:
                c = map(sum, zip(i, j))
                self.shadow.append(tuple(c))
        shadow_get = set(self.shadow)
        return shadow_get

    def get_ship_coordinates(self):
        return self.ship_position

    def gen_ship(self, deck):
        rand = Coordinates()
        line = rnd.randint(0, 1)
        ship = Ship(rand.rand_coordinates(deck, line), deck, line)
        ship.set_ship_coordinates()
        return ship

    def gen_ships(self):
        ship_3d = self.gen_ship(3)
        shadows = []
        self.ships.append(ship_3d)
        shadows += ship_3d.shadow_ship()

        ship_2d = self.gen_ship(2)
        for i in range(2):
            pos = set(ship_2d.get_ship_coordinates())
            while pos.intersection(shadows):
                ship_2d = self.gen_ship(2)
                pos = set(ship_2d.get_ship_coordinates())
            self.ships.append(ship_2d)
            shadows += ship_2d.shadow_ship()

        ship_1d = self.gen_ship(1)
        for i in range(4):
            pos = set(ship_1d.get_ship_coordinates())
            while pos.intersection(shadows):
                ship_1d = self.gen_ship(1)
                pos = set(ship_1d.get_ship_coordinates())
            self.ships.append(ship_1d)
            shadows += ship_1d.shadow_ship()

        for i in self.ships:
            self.ship_position += i.ship_position

    def get_ships(self):
        return self.ship_position


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
    # def is_destroyed(self, ships, ):
    # # Проверка количества оставшихся кораблей


class GameEvent:
    def __init__(self):
        self.player = player
        self.comp = comp
        self.coordinates = Coordinates()
        self.coordinates.create_possble_coordinates()
        self.possible_coordinates = self.coordinates.possible_coordinates.copy()

        # ход игрока
    def player_step(self):

        x_y_str = input("Введите координаты поля через пробел (Y X)")
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
        self.coordinates = self.possible_coordinates.pop(rnd.randint(0, len(self.possible_coordinates)))
        return self.coordinates

    def player_turn(self):

        if logic.hit_ship(comp.get_ships(), tuple(self.player_step())):
            comp_desk.set_game_desk([self.coordinates], "X |")
            print("HIT, player turn")
            return True
        else:
            comp_desk.set_game_desk([self.coordinates], "T |")
            print("False, comp turn")
            self.game_pass()
            _ = input("for turn press Enter")
            return False

    def comp_turn(self):
        coordinates = self.comp_step()
        if logic.hit_ship(player.get_ships(), coordinates):
            player_desk.set_game_desk([coordinates], "X |")
            print("HIT, comp turn")
            _ = input("for turn press Enter")
            return True
        else:
            player_desk.set_game_desk([coordinates], "T |")
            print("False, player turn")
            self.game_pass()
            return False

    def game_pass(self):
        print("Player field")
        player_desk.print_game_desk()
        print("Comp field")
        comp_desk.print_game_desk()


player_desk = GameDesk()
player = Ship()
player.gen_ships()

player_ships = player.ships
a = []
for i in player_ships:
    a.append(i.ship_position)

print(len(a))

# comp_desk = GameDesk()
# comp = Ship()
# comp.gen_ships()
#
# event = GameEvent()
# logic = GameLogic()
#
# player_desk.set_game_desk(player.get_ships(), "# |")
#
# event.game_pass()
# while True:
#     while event.player_turn():
#         event.game_pass()
#     while event.comp_turn():
#         event.game_pass()
