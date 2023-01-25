def qsort(array, left, right):
    middle = (left + right) // 2

    p = array[middle]
    i, j = left, right
    while i <= j:
        while array[i] < p:
            i += 1
        while array[j] > p:
            j -= 1
        if i <= j:
            array[i], array[j] = array[j], array[i]
            i += 1
            j -= 1

    if j > left:
        qsort(array, left, j)
    if right > i:
        qsort(array, i, right)


array = [2, 3, 1, 4, 6, 5, 9, 8, 7]
l = array[:4]
r = array[4:]
print(l)
print(r)
print(qsort(array, 4, 5))
