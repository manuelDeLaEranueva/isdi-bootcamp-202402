var assert = require('./assert')

var Animal = require('./Animal')
var Pet = require('./Pet')
var Person = require('./Person')

console.log('TEST Pet')

console.log('CASE constructor')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)
var sultan = new Pet(peter, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)

assert.instanceOf(sultan, Pet)
assert.equalsValue(sultan.constructor, Pet)
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

assert.instanceOf(sultan, Pet)
assert.instanceOf(sultan, Animal)

console.log('CASE toString')

var peter = new Person('Peter', 'Pan', new Date(2000, 0, 31, 16, 45), 'GB', 140, 50)
var sultan = new Pet(peter, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)

assert.equalsValue(sultan.toString(), 'Pet (Sultan, 2000-01-31, GB)')

console.log('CASE constructor fails on non-Person owner')

var errorThrown

try {
    new Pet(undefined, 'Sultan', new Date(2000, 0, 31, 16, 45), 'GB', 50)
} catch (error) {
    errorThrown = error
}

assert.error(errorThrown, 'TypeError', 'owner is not a Person')