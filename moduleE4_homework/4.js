//Задание №4
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
    this.isOn = false;
}

// функция конструктор электроламп
function Lamp(power, type = ""){
    this.type = type;
    this.power = power;
}
Lamp.prototype = new ElectricalApp();   // наследуемся от электроприборов

// функция конструктор компьютеров
function Comp(power, type = ""){
    this.type = type;
    this.power = power;
}
Comp.prototype = new ElectricalApp();

// функция конструктор чайников
function Kettle (power, type = ""){
    this.type = type;
    this.power = power;
}
Kettle.prototype = new ElectricalApp();


const lamp = new Lamp(15, "led");
lamp.setOn();
const comp = new Comp(450, "PC");
comp.setOn();
const kettle = new Kettle(2000, "thermopot");
kettle.power = 2000;


let equipment = [lamp, comp, kettle];

let sumOnPower = 0;
for (let key in equipment){
    if (equipment[key].isOn) {
        sumOnPower += equipment[key].power
    }
}
console.log(`мощность включенных приборов - ${sumOnPower} Ватт`);