import sqr_circ

r = int(input("Enter radius: "))
a = int(input("Enter side 'a' of rectangle: "))
b = int(input("Enter side 'b' of rectangle: "))

print("circle") if sqr_circ.circle_sqr(r) > sqr_circ.rect_sqr(a, b) else print("square")
