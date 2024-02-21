/**
 * Extracts an element in an iterable object and returns it.
 *
 * @param object - The iterable object to mutate. 
 * @param value - The value to extract.
 * 
 * @throws {TypeError} When object is not an object.
 * @throws {TypeError} When callback is not a function.
 */

function extract(object, callback) {
    if (object instanceof Object === false)
        throw new TypeError(object + ' is not an Object')

    else if (callback instanceof Function === false)
        throw new TypeError(callback + ' is not a Function')

    else {
        let arrayObj = []
        let found = -1

        for (let i = 0; i < object.length; i++) {
            let elem = callback(object[i])
            if (elem === false && found === -1) {
                arrayObj[arrayObj.length] = object[i]
            } else if (elem && found === -1) {
                found = object[i]
            } else
                arrayObj[arrayObj.length] = object[i]
        }

        if (found !== -1) {
            for (let i = 0; i < arrayObj.length; i++) {
                object[i] = arrayObj[i]
            }
            delete object[object.length - 1]
            object.length--
        }
        return found
    }
}

console.log('CASE 1')

let powerpuff = {
    0: { name: 'Sonic', color: 'blue' },
    1: { name: 'Blossom', color: 'pink' },
    2: { name: 'Bubbles', color: 'blue' },
    3: { name: 'Buttercup', color: 'green' },
    length: 4
}

let result = extract(powerpuff, function (result) {
    return result.color === 'blue'
})

console.log(result)
//{name:'Sonic', color: 'blue'}
console.log(powerpuff)
/*{
    0: {name: 'Blossom', color:'pink'},
    1: {name: 'Bubbles', color:'blue'},
    2: {name: 'Buttercup', color:'green'},
    length: 3
}*/


console.log('CASE 2')

result = extract(powerpuff, function (result) {
    return result.name === 'Mojo Yoyo'
})

console.log(result)
//-1
console.log(powerpuff)
/*{
    0: {name: 'Blossom', color:'pink'},
    1: {name: 'Bubbles', color:'blue'},
    2: {name: 'Buttercup', color:'green'},
    length: 3
}*/


console.log('CASE 3')
let str = 'Powerpuff Girls'
try {
    extract(str, function (result) {
        return result.name === 'Bubbles'
    })
} catch (error) {
    console.log(error)
    //Powerpuff Girls is not an Object
}


console.log('CASE 4')
try {
    extract(powerpuff, str)
} catch (error) {
    console.log(error)
}
//Powerpuff Girls is not a Function