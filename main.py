from function import hello
import math
import time

t = time.time()
i = 10
while i:
    print(i)
    time.sleep(1)
    i -= 1
print("End")

print(math.trunc(math.fmod(math.fabs(-10000000), 55)+0.3))
time.sleep(1)
print(time.strftime("%m"))
print(time.time() - t)