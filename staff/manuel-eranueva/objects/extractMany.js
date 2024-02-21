/**
 * Extract manys elements that matches the condition from an iterable object.
 *
 * @param object - The iterable object to mutate. 
 * @param index - The index from which to extractMany a value.
 * 
 * @throws {TypeError} When object is not an object, or when index is not a number.
 */
function extractMany(object, callback) {
    // TODO
}

console.log('CASE 1: extracts many users form users')

var users = {
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    2: { name: 'Pepito', age: 50 },
    3: { name: 'Campa', age: 30 },
    4: { name: 'James', age: 40 },
    length: 5
}

var extracted = extractMany(users, function (user) {
    return user.age > 25
})

console.log(extracted)
/*
{
    0: { name: 'Pepito', age: 50 },
    1: { name: 'Campa', age: 30 },
    2: { name: 'James', age: 40 },
    length: 3
}
*/

console.log(users)
/*
{
    0: { name: 'Wendy', age: 19 },
    1: { name: 'Peter', age: 20 },
    length: 2
}
*/