// класс родитель электроприборы
class ElectricalApp{
    constructor(power) {
        this.power = power; // свойство - мощность
        this.isOn = false;  // свойство - включен ли прибор
        }
    setOn(){          // метод родителя включить прибор
        this.isOn = true;
    }
    setOff(){         // метод родителя выключить прибор
        this.isOn = false;
    }
}

// класс потомок электролампа
class Lamp extends ElectricalApp{
    constructor(power, type) {
        super(power);
        this.type = type;   // свойство потомка определяет свойство присущее этому потомку
                            // например электролампа может быть светодиодной или лампой накаливания
    }
}

class Comp extends ElectricalApp{
    constructor(power, type) {
        super(power);
        this.type = type;
    }
}

class Kettle extends ElectricalApp{
    constructor(power, type) {
        super(power);
        this.type = type;
    }
}

const lamp1 = new Lamp(15, 'led');        // создаем экземпляр лампы
lamp1.setOff();                                              // выключаем лампу
const lamp2 = new Lamp(65, 'filament');   // создаем экземпляр другой лампы
lamp2.setOn();                                               // включаем лампу
const comp = new Comp(450, 'PC');
comp.setOn();
const kettle = new Kettle(2000, 'thermopot');

let equip = [lamp1, lamp2, comp, kettle];
let sumOnPower = 0;
for (let key in equip){
    if (equip[key].isOn){
        sumOnPower += equip[key].power          // подсчитываем суммарную мощность включенных приборов
    }
}
console.log(`Мощность включенных приборов - ${sumOnPower} Ватт`)