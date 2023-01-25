array = [2, 3, 1, 4, 6, 5, 9, 8, 7, 0]
#
# for i in range(1, len(array)):
#     k = i - 1
#     if array[i] < array[k]:
#         while array[i] < array[k] and k > 0:
#             k -= 1
#         array.insert(k, array.pop(i)) if k == 0 else array.insert(k + 1, array.pop(i))

count = 0

array = [2, 3, 1, 4, 6, 5, 9, 8, 7]
for i in range(1, len(array)):
    x = array[i]
    idx = i
    while idx > 0:
        count += 1
        if (array[idx - 1] <= x):
            break
        array[idx] = array[idx - 1]
        idx -= 1
    array[idx] = x

print(count)

print(array)
