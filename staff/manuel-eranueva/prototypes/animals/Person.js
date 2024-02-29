var Animal = require('./Animal')

function Person(name, surname, birthdate, country, height, weight) {
    Animal.call(this, name, birthdate, country, weight)

    this.surname = surname
    this.height = height
    this.talking = false
}

Person.prototype = Object.create(Animal.prototype)
Person.prototype.constructor = Person

Person.NOT_WALK = 0
Person.WALK_VERY_SLOW = 1
Person.WALK_SLOW = 2
Person.WALK_NORMAL = 4
Person.WALK_FAST = 5
Person.RUN = 6

Person.prototype.talk = function () {
    this.talking = true
}

module.exports = Person