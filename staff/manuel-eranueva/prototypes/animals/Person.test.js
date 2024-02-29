var assert = require('./assert')

var Person = require('./Person')

console.log('TEST Person')

console.log('CASE constructor')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)

assert.instanceOf(peter, Person)
assert.equalsValue(peter.constructor, Person)
assert.equalsValue(peter.name, 'Peter')
assert.equalsValue(peter.surname, 'Pan')
//assert.equalsValue(person.birthdate instanceof Date, true)
assert.instanceOf(peter.birthdate, Date)
assert.equalsValue(peter.birthdate.getFullYear(), 2000)
assert.equalsValue(peter.birthdate.getMonth(), 0)
assert.equalsValue(peter.birthdate.getDate(), 31)
assert.equalsValue(peter.birthdate.getHours(), 16)
assert.equalsValue(peter.birthdate.getMinutes(), 45)
assert.equalsValue(peter.country, 'GB')
assert.equalsValue(peter.height, 140)
assert.equalsValue(peter.weight, 50)
assert.equalsValue(peter.sleeping, false)
assert.equalsValue(peter.eating, '')
assert.equalsValue(peter.legsSpeed, Person.NOT_WALK)
assert.equalsValue(peter.talking, false)

console.log('CASE walk & talk')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 1, 16, 45), 'GB', 140, 50)

peter.moveLegs()
peter.talk()

assert.equalsValue(peter.talking, true)
assert.equalsValue(peter.legsSpeed, Person.WALK_NORMAL)