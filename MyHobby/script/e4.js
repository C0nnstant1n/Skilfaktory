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

// objectKeys(person)

//Задание №2
function isStrOrObject(name, obj){
    for (let key in obj) {
        if (key === name){
            return true
        }
    }
    return false
}

// console.log(isStrOrObject("age", student))


//Задание №3
function emptyProto(){
    return ''
}

// let a= emptyProto()
// console.log(a)

//Зфдание №4
// конструктор родителя определяет клас электроприборов
function ElectricalApp(){
    this.isOn =  false; //  определяет включен ли прибор
    this.power = 0;     //  мощность прибора
}
// функция "включения"
ElectricalApp.prototype.setOn = function (){
    this.isOn = true;
}
// функция "выключения"
ElectricalApp.prototype.setOff = function (){
    this.isOff = false;
}

// функция конструктор электроламп
function Lamp(type = ""){
    this.type = type;
}
Lamp.prototype = new ElectricalApp();   // наследуемся от электроприборов

// функция конструктор компьютеров
function Comp(type = ""){
    this.type = type;
}
Comp.prototype = new ElectricalApp();

// функция конструктор чайников
function Kettle (type = ""){
    this.type = type;
}
Kettle.prototype = new ElectricalApp();


const lamp = new Lamp("led");
lamp.power = 15;
lamp.setOn();
const comp = new Comp("PC");
comp.power = 500;
const kettle = new Kettle("thermopot");
kettle.power = 2000;
comp.setOn();

let equipment = [lamp, comp, kettle];

let sumOnPower = 0
for (let part in equipment){
    if (equipment[part].isOn) {
        sumOnPower += equipment[part].power
    }
}
console.log(`мощность включенных приборов - ${sumOnPower} Ватт`)