let fruits = new Map([

    ["apple", "green"],

    ["strawberry", "red"],

    ["blueberry",    "blue"]

]);

for (let key of fruits.keys()){
    console.log(`Key - ${key}, Value - ${fruits.get(key)}`)
}