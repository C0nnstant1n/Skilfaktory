list_1 = [1, 2]

list_2 = [1, 2, 3]
val = list_2.pop()  # Интересный момент - последний элемент
# не просто удаляется из списка, а присвается переменной val

print(list_1)
print(list_2)
print(val)
print(list_1 == list_2)