"""Запишите условие, которое является истинным,
когда только одно из чисел А, В и С меньше 45."""

list_varibles = ((60, 60, 60), (60, 30, 60), (60, 60, 30),
     (30, 30, 30), (30, 30, 60), (60, 30, 30))


def check_z(list_variables):
    a, b, c = list_variables
    print(f"a = {a}, b = {b}, c = {c}")
    z = ((a < 45 <= c and b >= 45) or           # условие задачи
         (b < 45 <= c and a >= 45) or
         (c < 45 <= a and b >= 45))
    return z


for i in list_varibles:
    print(check_z(i))
    print("")
