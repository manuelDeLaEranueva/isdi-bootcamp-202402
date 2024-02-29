function Animal(name, birthdate, country, weight) {
    if (typeof name !== 'string') throw new TypeError('name is not a string')
    if (!(birthdate instanceof Date)) throw new TypeError('birthdate is not a date')
    if (typeof country !== 'string') throw new TypeError('weight is not a number')
    if (typeof weight !== 'number') throw new TypeError('weight is not a number')

    this.name = name
    this.birthdate = birthdate
    this.country = country
    this.weight = weight
    this.sleeping = false
    this.eating = ''
    this.legsSpeed = Animal.NOT_WALK

}

Animal.NOT_WALK = 0
Animal.WALK_VERY_SLOW = 1
Animal.WALK_SLOW = 2
Animal.WALK_NORMAL = 4
Animal.WALK_FAST = 5
Animal.RUN = 6

Animal.prototype.sleep = function () {
    this.sleeping = true
}

Animal.prototype.awake = function () {
    this.sleeping = false
}

Animal.prototype.eat = function (food) {
    if (this.sleeping) throw new Error('try to eat while sleeping')

    this.eating = food
}

Animal.prototype.moveLegs = function (speed) {
    this.legsSpeed = speed === undefined ? 4 : speed
}

Animal.prototype.toString = function () {
    return Animal.name + ' (' + this.name + ')'
}

module.exports = Animal