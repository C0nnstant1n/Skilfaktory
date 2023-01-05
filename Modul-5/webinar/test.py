class Var:
    field1 = 10

    def sqr(self):
        return self.field1 ** 2


a = Var()
a.field1 = 2
a.field2 = 4
print(a.sqr(a.field2))
