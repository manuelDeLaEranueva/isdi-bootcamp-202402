var assert = require('./assert')

var Animal = require('./Animal')
var Pet = require('./Pet')
var Chiken = require('./Chiken')
var Person = require('./Person')

console.log('TEST Chiken')

console.log('CASE constructor')

var manuel = new Person('Manuel', 'Eranueva', new Date(1995, 0, 27, 19, 30), 'ES', 182, 75)
var pitita = new Chiken(manuel, 'pitita', new Date(2024, 1, 15, 22, 20), 'ES', 1.5)

assert.equalsValue(pitita.constructor, Chiken)
assert.instanceOf(pitita, Chiken)
assert.instanceOf(pitita, Pet)
assert.instanceOf(pitita, Animal)

assert.equalsValue(pitita.name, 'pitita')
assert.instanceOf(pitita.birthdate, Date)
assert.equalsValue(pitita.birthdate.getFullYear(), 2024)
assert.equalsValue(pitita.birthdate.getMonth(), 1)
assert.equalsValue(pitita.birthdate.getDate(), 15)
assert.equalsValue(pitita.birthdate.getHours(), 22)
assert.equalsValue(pitita.birthdate.getMinutes(), 20)
assert.equalsValue(pitita.country, 'ES')
assert.equalsValue(pitita.weight, 1.5)
assert.equalsValue(pitita.sleeping, false,)
assert.equalsValue(pitita.eating, '')
assert.equalsValue(pitita.legsSpeed, 0)
assert.equalsValue(pitita.clocloing, false,)

console.log('CASE cloclo')

var manuel = new Person('Manuel', 'Eranueva', new Date(1995, 0, 27, 19, 30), 'ES', 182, 75)
var pitita = new Chiken(manuel, 'Pitita', new Date(2024, 1, 15, 22, 20), 'ES', 1.5)

pitita.cloclo()

assert.equalsValue(pitita.clocloing, true)

console.log('CASE lay an egg')

var manuel = new Person('Manuel', 'Eranueva', new Date(1995, 0, 27, 19, 30), 'ES', 182, 75)
var pitita = new Chiken(manuel, 'Pitita', new Date(2024, 1, 15, 22, 20), 'ES', 1.5)

pitita.clocloing = true

pitita.layEgg()

assert.equalsValue(pitita.clocloing, false)



