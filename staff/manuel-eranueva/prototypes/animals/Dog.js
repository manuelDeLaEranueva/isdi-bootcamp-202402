var Pet = require('./Pet')

function Dog(owner, name, birthdate, country, weight) {
    Pet.call(this, owner, name, birthdate, country, weight)

    this.barking = false
}

Dog.prototype = Object.create(Pet.prototype)
Dog.prototype.constructor = Dog

Dog.prototype.bark = function () {
    this.barking = true
}

Dog.prototype.tsssh = function () {
    this.barking = false
}

module.exports = Dog