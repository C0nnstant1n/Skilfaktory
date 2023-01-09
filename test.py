def shadow_ship(x):
    shadow = []
    for i in x:
        shadow += (i[0], i[1]), (i[0], i[1])
        shadow += (i[0] - 1, i[1] - 1), (i[0] - 1, i[1] + 1)
        shadow += (i[0] + 1, i[1] + 1), (i[0] + 1, i[1] + 1)
        shadow += (i[0] - 1, i[1] + 1), (i[0] + 1, i[1] - 1)
        shadow += (i[0], i[1] + 1), (i[0], i[1] - 1)
        shadow += (i[0] + 1, i[1]), (i[0] + 1, i[1])
        shadow += (i[0] - 1, i[1]), (i[0], i[1] - 1)
    return shadow


print(shadow_ship(((2, 3), (2, 4))))
