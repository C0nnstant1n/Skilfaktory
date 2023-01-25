from datetime import datetime
import time

from contextlib import contextmanager  # импортируем нужный нам декоратор


@contextmanager  # оборачиваем функцию в декоратор contextmanager
def timer():
    start = datetime.utcnow()
    yield  # если вам нужно что-то вернуть через контекстный менеджер, просто вставьте этот объект сюда.
    print(start)
    end = datetime.utcnow()
    print(end)
    print(f"Time passed: {(datetime.utcnow() - start).total_seconds()}")


with timer():
    time.sleep(2)