function Car(brand, model, year, color, doors, fuelType, transmission, maxGears, direction) {
    this.brand = brand
    this.model = model
    this.year = year
    this.color = color
    this.doors = doors
    this.fuelType = fuelType
    this.transmission = transmission
    this.status = 'off'
    this.deposit = 0
    this.currentGear = 0
    this.maxGears = maxGears
    this.direction = 'none'
    this.speed = 0
    this.acceleration = 0
    this.steerWheel = 0
}

Car.prototype.fuel = function (load) {
    if (typeof load !== 'number')
        throw new TypeError(load + ' is not a number')
    if (load < 0 || load > 100)
        throw new RangeError(load + ' is more than 100 or less than 0')
    this.deposit = load
}

Car.prototype.start = function () {
    this.status = 'on'
}

Car.prototype.stop = function () {
    this.status = 'off'
    this.direction = 'none'
}

Car.prototype.date = function (year) {
    if (typeof date !== 'number')
        throw new TypeError(date + ' is not a number')
    if (date < 0 || date > 2024)
        throw new RangeError(date + ' is more than 2024 or less than 0')
    this.year = date
}


Car.prototype.changeSteering = function (steering) {
    this.steering = steering
    if (!Number.isInteger(steering))
        throw new TypeError(gear + ' is not an integer')
    if (steering < -180 || steering > 180)
        throw new RangeError('This angle does  not exist')
    this.steerWheel = steering

}

Car.prototype.changeGear = function (gear) {
    if (!Number.isInteger(gear))
        throw new TypeError(gear + ' is not an integer')
    if (gear < -1 || gear > Car.maxGears)
        throw new RangeError('This gear does  not exist')

    this.currentGear = gear

    if (gear < 0)
        this.direction = 'backward'
    if (gear === 0)
        this.direction = 'none'
    if (gear > 0)
        this.direction = 'forward'
}

Car.prototype.speedUp = function (speed) {
    if (this.status === 'off')
        try { throw new Error('Your car is turned off') } catch (Error) { }
    if (typeof speeed !== 'number')
        try { throw new TypeError(speed + ' is not a number') } catch (TypeError) { }
    if (speed < 1 || speed > 120)
        try { throw new RangeError('The speed can only be from 1 to 120') } catch (TypeError) { }

    this.speed = speed
}


module.exports = Car
//Pet.prototype = Object.create(Animal.prototype)