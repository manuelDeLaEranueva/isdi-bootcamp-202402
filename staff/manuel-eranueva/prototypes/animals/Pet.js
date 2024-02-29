var Animal = require('./Animal')
var Person = require('./Person')

function Pet(owner, name, birthdate, country, weight) {
    if (!(owner instanceof Person)) throw new TypeError('owner is not a Person')
    this.owner = owner

    Animal.call(this, name, birthdate, country, weight)
}

//Pet.prototype = new Animal
Pet.prototype = Object.create(Animal.prototype)
Pet.prototype.constructor = Pet

Pet.prototype.toString = function () {
    return Pet.name + ' (' + this.name + ', ' + this.birthdate.toLocaleDateString('en-CA') + ', ' + this.country + ')'
}

Pet.NOT_WALK = 0
Pet.WALK_VERY_SLOW = 1
Pet.WALK_SLOW = 2
Pet.WALK_NORMAL = 4
Pet.WALK_FAST = 5
Pet.RUN = 6

module.exports = Pet