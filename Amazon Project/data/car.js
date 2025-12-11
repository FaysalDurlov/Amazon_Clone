class Car{
    brand;
    model;
    #brand;
    #model;
    speed = 0
    isTrunkOpen = false;
    constructor(CarDetails){
        this.brand = CarDetails.brand;
        this.model = CarDetails.model;
        this.#brand = CarDetails.brand;
        this.#model = CarDetails.model;
    }
    displayInfo(){
        console.log(`${this.brand} ${this.model}, Speed: ${this.speed} km/h, Trunk = ${this.isTrunkOpen? "Open": "close"}`);
        console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed} km/h, Trunk = ${this.isTrunkOpen? "Open": "close"}`);
    }
    go(){
        if((this.speed < 200) && (!this.isTrunkOpen)){
            this.speed +=5;
        }
    }
    brake(){
        if(this.speed > 0){
            this.speed -=5;
        }
    }
    openTrunk(){
        if (this.speed === 0){
            this.isTrunkOpen = true;
        }
    }
    closeTrunk(){
        this.isTrunkOpen = false;
    }
};

class RaceCar extends Car{
    acceleration;

    constructor(CarDetails){
        super(CarDetails)
        this.acceleration = CarDetails.acceleration
    }

    //go method override
    go(){
        if(this.speed<300){
            this.speed += this.acceleration;
        }
    }
    openTrunk(){
        console.log('Race cars do not have a trunk.');
    }
    closeTrunk(){
        console.log('Race cars do not have a trunk.');
    }

}

const raceCar_1 =new RaceCar({brand:"McLaren",model: "F1", acceleration: 20})
const Car_1 = new Car({brand:"Toyota", model:"Corolla"});
const Car_2 = new Car({brand:"Tesla", model:"Model 3"});



console.log(Car_1);
console.log(Car_2);
Car_2.openTrunk();
// Car should not go since the trunk is open.
Car_2.go();
Car_2.displayInfo();
Car_2.displayInfo();

raceCar_1.go();
raceCar_1.go();
raceCar_1.go();
raceCar_1.displayInfo();
raceCar_1.openTrunk();
raceCar_1.displayInfo();
raceCar_1.brake();
raceCar_1.displayInfo();