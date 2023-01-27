import os
print("-" * 40)
start_path = os.getcwd()
print(start_path)
print(os.getcwd())
print(start_path)
print(os.listdir())
if 'test.txt' not in os.listdir():
    print("Файл отсутствует в данной директории")
print("-" * 40)
with open("test.txt", "r", encoding="utf8") as f:
    for line in f:
        print(line, end="")
        outfile = open("output.txt", "a", encoding="utf8")
        outfile.writelines(line)
        outfile.close()