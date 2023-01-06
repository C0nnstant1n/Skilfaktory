"""На основе предложенной схемы составьте код, который будет печатать,
что необходимо надеть, в зависимости от погодных условий.

Перенесите в код всё, что есть на схеме. Используйте переменные
temperature и isRain. """

print("ЧТО НАДЕТЬ?")
print()
temperature = int(input("Input temperature: "))

if 20 < temperature < 30:
    israin = input("Есть осадки? ")
    if israin == "y" or israin == "Y":
        print("Наденьте футболку, шорты и дождевик")
    else:
        print("Футболку и шорты")
else:
    if temperature > 0:
        israin = input("Есть осадки? ")
        if israin == "y" or israin == "Y":
            rain_strong = input("Дождь сильный? ")
            if rain_strong == "y" or rain_strong == "Y":
                print("Пальто резиновые сапоги и зонт")
            else:
                print("Пальто и дождевик")
        else:
            print("Пальто")
    else:
        print("Пуховик")
