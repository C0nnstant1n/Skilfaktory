G = {"Адмиралтейская": {"Садовая": 4},
     "Садовая": {"Сенная площадь": 4, "Спасская": 3, "Адмиралтейская": 4, "Звенигородская": 5},
     "Сенная площадь": {"Садовая": 4, "Спасская": 4},
     "Спасская": {"Садовая": 3, "Сенная площадь": 4, "Достоевская":6},
     "Достоевская": {"Владимирская": 3, "Спасская": 6},
     "Владимирская": {"Достоевская": 3, "Пушкинская": 4},
     "Пушкинская": {"Владимирская": 4, "Звенигородская":3},
     "Звенигородская": {"Пушкинская": 3, "Садовая": 5}}

D = {k: 100 for k in G.keys()}      # расстояния
start_k = "Достоевская"
D[start_k] = 0

U = {k: False for k in G.keys()}    # флаги просмотра вершин
P = {k: None for k in G.keys()}     # предки
for _ in range(len(D)):
    min_k = min([k for k in U.keys() if not U[k]], key= lambda x: D[x])
    for v in G[min_k].keys():
        if D[min_k] + G[min_k][v] < D[v]:
            D[v] = D[min_k] + G[min_k][v]
            P[v] = min_k
    U[min_k] = True

pointer = "Владимирская"
path =[]
while pointer is not None:
    path.append(pointer)
    pointer = P[pointer]

path.reverse()
for v in path:
    print(v)

for i in D.items():
    print(i, P.get(i))
