import os


print("-" * 40)
start_path = os.getcwd()
print(start_path)
print("-" * 40)
print(os.listdir())

if 'test.txt' not in os.listdir():
    print("Файл отсутствует в данной директории")
print("-" * 40)

# f = open("test.txt", "w", encoding="utf8")
# f.write("This is a test string\n")
# f.write("Это новая строка\n")
# f.close()

# f = open('test.txt', 'a', encoding='utf8')  # открываем файл на дозапись

# sequence = ["other string\n", "123\n", "test test\n"]
# f.writelines(sequence)  # берет строки из sequence и записывает в файл (без переносов)
#
# f.close()
with open("test.txt", "r", encoding="utf8") as f:
    for line in f:
        print(line, end="")
        outfile = open("output.txt", "a", encoding="utf8")
        outfile.writelines(line)
        outfile.close()





