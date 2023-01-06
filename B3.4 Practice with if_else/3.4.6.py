"""Дано натуральное восьмизначное число. Выясните,
является ли оно палиндромом (читается одинаково слева направо и
справа налево).

Если число является палиндромом, необходимо вывести на экран
сообщение "Number - палиндром", если не является — "Number -
не палиндром"."""

while True:

    number = input("введите число: ")
    reversed_number = number[::-1]
    print(reversed_number)
    if number == reversed_number:
        print(f"{number} - палиндром")
        break
    else:
        print(f"{number} - не палиндром")
