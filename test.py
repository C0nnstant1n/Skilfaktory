def shadow_ship(x):
    shadow = []
    mask = (-1, -1), (-1, 0), (-1, 1), (0, -1),\
        (0, 0), (0, 1), (1, -1), (1, 0), (1, 1)
    for j in x:
        for i in mask:
            c = map(sum, zip(i, j))
            shadow.append(tuple(c))

    shadow_set = set(shadow)
    return shadow_set


print(shadow_ship(([3, 1], [2, 1])))
