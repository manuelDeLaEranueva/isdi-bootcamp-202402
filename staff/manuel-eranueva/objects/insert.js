/**
 * Inserts an element in iterable object at specfified index.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to insert the given values.
 * @param value - The value to insert.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function insertMany(object, index, value) {
    // TODO
    if (!(object instanceof Object)) throw new TypeError(object + ' is not an Object')
}

console.log('CASE 1: insert skyblue in index 1')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 1, 'skyblue')

console.log(length)
// 4

console.log(colors)
/*
{
    0: 'red',
    1: 'skyblue',
    2: 'blue',
    3: 'green',
    length: 4
}
*/

console.log('CASE 2: insert skyblue, gold and plum in index 2')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var length = insertMany(colors, 2, 'skyblue', 'gold', 'plum')

console.log(length)
// 6

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'skyblue',
    3: 'gold',
    4: 'plum',
    5: 'green',
    length: 6
}
*/

console.log('CASE 3: fails on undefind object parameter')

try {
    insertMany()
} catch (error) {
    console.log(error)
    // TypeError: undefined is not an Object
}

console.log('CASE 4: fails on 1 as an object parameter')

try {
    insertMany(1)
} catch (error) {
    console.log(error)
    // TypeError: 1 is not an Object
}

console.log('CASE 5: fails on undefined as index parameter')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

try {
    insertMany(colors)
} catch (error) {
    console.log(error)
    // TypeError: undefined is not a Number
}