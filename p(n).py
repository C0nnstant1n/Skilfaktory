def p(n):
    if n:
        p(n-1)
        print(n)
    else:
        return


p(5)
