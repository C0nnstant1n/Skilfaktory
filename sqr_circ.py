PI = 3.14


def circle_sqr(r):
    return PI * (r ** 2)


def rect_sqr(a, b):
    return a * b


if __name__ == '__main__':
    assert circle_sqr(5) == 78.5  # если ответы будут отличаться, то будет вызвана ошибка
    assert rect_sqr(5, 4) == 20