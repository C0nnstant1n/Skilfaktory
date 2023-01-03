class Room:
   def get_room(self):
      print('room')


class Room1(Room):
   def get_room(self):
      print('room1')


class Room2(Room):
   def get_room(self):
      print('room2')


class Flat(Room1, Room2):
   ...


print(Flat.mro())  # метод класса, который показывает порядок наследования

f = Flat()
f.get_room()
