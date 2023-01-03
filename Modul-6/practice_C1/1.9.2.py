from rectangle import Rectangle


class Rect(Rectangle):
    def __eq__(self, other):
        return self.width == other.width and self.height == other.height


rect_1 = Rect(12, 5)
rect_2 = Rect(12, 5)

print(rect_1 == rect_2)
print(rect_1.get_area())
print(rect_2.get_area())
