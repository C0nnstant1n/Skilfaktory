# ============================================
# import pygame
import random as rnd
# ============================================
# класс позиции элемента, хранящий значения х и у


class Pos:
    def __init__(self, x, y) -> None:
        self.x = x
        self.y = y


# абстракция — класс произвольной фигуры с полями позиция и цвет
class Figure:
    def __init__(self, pos) -> None:
        self.setpos(pos)
        self.setcolor(0)

    def setpos(self, pos):
        self.pos = pos

    def getpos(self):
        return self.pos

    def setcolor(self, color):
        self.color = color

    def getcolor(self):
        return self.color

    # метод, который намекает на “форму” — при выполнении метода класс возвращает True, если
    # точка, переданная х и у, лежит внутри фигуры и False в противном случае
    # поскольку класс Figure “не имеет” формы, то всегда возвращает False
    def isin(self, x, y) -> bool:
        return False


# класс прямоугольника с шириной и высотой
class Square(Figure):
    def __init__(self, pos, w, h) -> None:
        super().__init__(pos)
        self.w = w
        self.h = h

    # isIn в этом случае возвращает True, если точка лежит между границами прямоугольника
    def isin(self, x, y) -> bool:
        _pos = super().getpos()
        if (_pos.x < x) and ((_pos.x + self.w) > x) and (_pos.y < y) and ((_pos.y + self.y) > x):
            return True
        return False


# класс цели, включающий параметр стоимости
class HitMark:
    def __init__(self, cost) -> None:
        self.setCost(cost)

    def setCost(self, cost):
        self.cost = cost

    def getCost(self):
        return self.cost


# класс “прямоугольной” цели, наследуемый от класса прямоугольника и класса цели,
# который включает как форму, так и стоимость
class SquareHitMark(Square, HitMark):
    def __init__(self, pos, w, h, cost) -> None:
        super().__init__(pos, w, h)
        HitMark.setCost(self, cost)


# класс внутриигрового сообщения
class GameEvent:
    # пустое событие
    Event_None = 0
    # событие таймера
    Event_Tick = 1
    # событие “выстрела” по цели
    Event_Hit = 2

    def __init__(self, type, data) -> None:
        self.type = type
        self.data = data

    def gettype(self):
        return self.type

    def getdata(self):
        return self.data


# класс игровой логики
class GameLogic:
    def __init__(self, w, h) -> None:
        # ширина игрового поля
        self.gameboard_width = w
        # высота игрового поля
        self.gameboard_height = h
        # активные цели на доске
        self.marks = []
        # пораженные цели
        self.hitMarks = []
        # полученные очки
        self.score = 0

    # метод обработки сообщений, которые приходят к игровой логике
    def processevent(self, event):
        # если событие таймер, то добавляем ещё одну цель к списку активных целей
        if event.type == GameEvent.Event_Tick:
            # на случайной позиции в пределах игровой доски
            markRandPos = Pos(rnd.randint(20, self.gameboard_width - 20)
                              , rnd.randint(20, self.gameboard_height - 20))
            # случайного размера от 10 до 20
            markSize = rnd.randint(10, 20)
            # стоимость цели обратно пропорциональна размеру
            markCost = 30 - markSize
            # случайный цвет цели в формате RGB
            markColor = (rnd.randint(0, 255), rnd.randint(0, 255), rnd.randint(0, 255))
            mark = SquareHitMark(markRandPos, markSize, markSize, markCost)
            mark.setcolor(markColor)
            # добавляем цель на доску
            self.addhitmark(mark)
        # если сообщение “выстрел в цель”, то обрабатываем эту ситуацию
        # используя позицию pos, переданную от интерфейса
        if event.type == GameEvent.Event_Hit:
            self.hit(event.data)

    # метод добавить цель на “логическую” доску
    def addhitmark(self, mark):
        self.marks.append(mark)

    # метод поразить цель на “логической” доске
    def hit(self, pos):
        # перебираем все цели, и если метод isIn возвращает True
        # добавляем стоимость цели к счету и перемещаем ее из списка активных целей в пораженные
        for markindex in range(len(self.marks)):
            mark = self.marks[markindex]
            if mark.isin(pos.x, pos.y):
                self.score += mark.getcost()
                self.marks.pop(markindex)
                self.hitMarks.append(mark)
                break

    # метод возвращает все активные цели на доске
    def getboard(self):
        return self.marks

    # метод возвращает текущий счёт
    def getscore(self):
        return self.score
