var assert = require('./assert')

var Animal = require('./Animal')
var Pet = require('./Pet')
var Dog = require('./Dog')
var Person = require('./Person')

console.log('TEST Dog')

console.log('CASE constructor')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)
var sultan = new Dog(peter, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)

assert.equalsValue(sultan.constructor, Dog)
assert.instanceOf(sultan, Dog)
assert.instanceOf(sultan, Pet)
assert.instanceOf(sultan, Animal)

assert.equalsValue(sultan.name, 'Sultan')
assert.instanceOf(sultan.birthdate, Date)
assert.equalsValue(sultan.birthdate.getFullYear(), 2000)
assert.equalsValue(sultan.birthdate.getMonth(), 0)
assert.equalsValue(sultan.birthdate.getDate(), 31)
assert.equalsValue(sultan.birthdate.getHours(), 16)
assert.equalsValue(sultan.birthdate.getMinutes(), 45)
assert.equalsValue(sultan.country, 'GB')
assert.equalsValue(sultan.weight, 50)
assert.equalsValue(sultan.sleeping, false)
assert.equalsValue(sultan.eating, '')
assert.equalsValue(sultan.legsSpeed, 0)
assert.equalsValue(sultan.barking, false)

console.log('CASE bark')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)
var sultan = new Dog(peter, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)

sultan.bark()

assert.equalsValue(sultan.barking, true)

console.log('CASE tsssh')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)
var sultan = new Dog(peter, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)

sultan.barking = true

sultan.tsssh()

assert.equalsValue(sultan.barking, false)
