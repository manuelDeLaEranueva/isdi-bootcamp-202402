var Pet = require('./Pet')

function Chiken(owner, name, birthdate, country, weight) {
    Pet.call(this, owner, name, birthdate, country, weight)

    this.clocloing = false
}

Chiken.prototype = Object.create(Pet.prototype)
Chiken.prototype.constructor = Chiken

Chiken.prototype.cloclo = function () {
    this.clocloing = true
}

Chiken.prototype.layEgg = function () {
    this.clocloing = false
}

module.exports = Chiken