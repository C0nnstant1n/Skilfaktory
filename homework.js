class ElectricalApp{
    constructor(power) {
        this.power = power;
        this.isOn = false;
    }
    setOn(){
        this.isOn = true;
    }
    setOff(){
        this.isOn = false;
    }
}

class Lamp extends ElectricalApp{
    constructor(power, type) {
        super(power);
        this.type = type;
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

lamp1 = new Lamp(15, 'led');
lamp1.setOff();
lamp2 = new Lamp(65, 'filament');
lamp2.setOn();
comp = new Comp(450, 'PC');
comp.setOn();
kettle = new Kettle(2000, 'thermopot');

let equip = [lamp1, lamp2, comp, kettle];
let sumOnPower = 0;
for (let key in equip){
    if (equip[key].isOn){
        sumOnPower += equip[key].power
    }
}
console.log(`Мощность включенных приборов - ${sumOnPower} Ватт`)