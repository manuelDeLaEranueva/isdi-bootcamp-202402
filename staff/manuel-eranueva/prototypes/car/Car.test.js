var Car = require('./Car')

console.log('TEST Car')

console.log('CASE constructor')

var car = new Car('Ferrari', 'Testarossa', 1990, 'red', 3, 'gasoline', 'manual', 6, 'none')

console.assert(car.brand === 'Ferrari', 'brand is Ferrari')
console.assert(car.model === 'Testarossa', 'model is Testarossa')
console.assert(car.status === 'off', 'is off')
console.assert(car.deposit === 0, 'deposit is 0')
console.assert(car.year === 1990, 'year is 1990')
console.assert(car.color === 'red', 'car color is red')
console.assert(car.doors === 3, 'doors is 3')
console.assert(car.fuelType === 'gasoline', 'fuel type is gasoline')
console.assert(car.transmission === 'manual', 'car transmission is manual')
console.assert(car.maxGears === 6, 'gear is 6')
console.assert(car.currentGear === 0, 'gear is 0')
console.assert(car.speed === 0, 'speed is 0')
console.assert(car.acceleration === 0, 'acceleration is 0')
console.assert(car.direction === '', 'direction is empty')
console.assert(car.steerWheel === 0, 'steering is at 0')

console.log('CASE method fuel')

var car = new Car('Ford', 'Fiesta')

car.fuel(80)

console.assert(car.deposit === 80, 'deposit is at 80%')

console.log('CASE method start')

var car = new Car('Citroen', 'CV')

car.start()

console.assert(car.status === 'on', 'status is on')

console.log('CASE method stop')

var car = new Car('Citroen, CV')
car.status = 'on'

car.stop()



console.assert(car.status === 'off', 'status is off')

console.log('CASE method changeGear')

car.changeGear(1)

console.assert(car.currentGear === 1, 'gear is 1')

car.changeGear(2)

console.assert(car.currentGear === 2, 'gear is 2')

console.assert(car.currentGear === 2, 'gear is 2')

try {
    car.changeGear(5)
} catch (error) {
    console.assert(error.name, 'RangeError')
    console.assert(error.message, 'gear greater than 4')
}


car.changeGear(-1)

console.assert(car.currentGear === -1, 'gear is -1')

console.log('CASE method speedUp')

var car = new Car('Citroen', 'CV')

car.changeGear = 1

car.speedUp(20)

console.assert(car.acceleration === 20, 'acceleration is at 20')
console.assert(car.direction === 'forward', 'direction is forward')

car.gear = -1

car.speedUp(100)

console.assert(car.acceleration === 100, 'acceleration is at 100')
console.assert(car.direction === 'backward', 'direction is backward')

console.log('CASE method changeSteering')

var car = new Car('Citroen', 'CV')

car.gear = 1
car.acceleration = 10

car.changeSteering(20)

console.assert(car.steering === 20, 'steering is at 20')
console.assert(car.direction === 'forward-right', 'direction is forward-right')

car.gear = -1
car.acceleration = 10

car.changeSteering(-30)

console.assert(car.steering === -30, 'steering is at -30')
console.assert(car.direction === 'backward-left', 'direction is backward and left')