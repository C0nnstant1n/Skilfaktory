//Задание №2
const student = {
    age: 16,
    name: 'Ivan'
}

function isStrOrObject(name, obj){
    for (let key in obj) {
        if (key === name){
            return true
        }
    }
    return false
}

console.log(isStrOrObject("age", student))
