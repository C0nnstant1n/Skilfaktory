summa = 1000
n = 0
while summa < 3000:
    n += 1
    summa = summa + (summa * 0.08)
print("вам понадобиться ", n, "лет \n", summa)
