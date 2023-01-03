from cat import Cat

cat1 = Cat('Семён', "мальчик", 5)

print(cat1.get_name())
print(cat1.get_gender())
print(cat1.get_age(), "лет")


# задание 1.8.2
class Dog(Cat):
    def get_pet(self):
        return self.get_name(), self.get_age()


pet = Dog("Барон", "мальчик", 8)
print(pet.get_pet())
