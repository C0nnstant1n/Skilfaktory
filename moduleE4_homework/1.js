//Задание №1
const student = {
    age: 16,
    name: 'Ivan'
}

const person = Object.create(student)
person.city  = "Moscow"
person.ownName = 'Hulk'


function objectKeys(obj){
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            console.log(`${key} : ${obj[key]}`);
        }
    }
}

objectKeys(person)