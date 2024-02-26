delete Array.prototype.at

function at(array, index) {
    //TODO implement me
    var char
    if (index > -1)
        char = array[index]
    else {
        var newIndex = array.length + index
        char = array[newIndex]
    }
    return char
}
/*
function at(array, index) {
    var targetIndex = index > -1 ? index : array.length + index
    var element = array[targetIndex]
    return element
}
*/

// CASE 1

var nums = [100, 200, 300, 400, 500]

var num = at(nums, 3)
console.log('CASE 1')
/*console.assert(num === nums[3], 'num must equal to third index of array given') //no refenciar la función*/
console.assert(num === 400, 'num must equal to third index of array given') //aserción concreta del caso

//400

console.log('CASE 2')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']
var other = []
var char = at(chars, 4)
console.assert(chars[4] === ' ', 'fourth index in chars must equal to blankspace')

//' '

console.log('CASE 3')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -3)

console.assert(char === 'n', 'char must be n, the third element starting from the end of array')
// 'n'

console.log('CASE 4')

var chars = ['h', 'o', 'l', 'a', ' ', 'm', 'u', 'n', 'd', 'o']

var char = at(chars, -30)

console.assert(char === undefined, 'char must be n, the third element starting from the end of array')
//undefinded