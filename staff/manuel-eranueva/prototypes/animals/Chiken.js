var Pet = require('./Pet')

function Chiken(owner, name, birthdate, country, weight) {
    Pet.call(this, owner, name, birthdate, country, weight)

    this.cloclo = false
}

Chiken.prototype = Object.create(Pet.prototype)
Chiken.prototype.constructor = Chiken

Chiken.prototype.bark = function () {
    this.cloclo = true
}

Chiken.prototype.layEgg = function () {
    this.cloclo = false
}

module.exports = Chiken