delete Array.prototype.push()

function push(array, ...element) {
    for (var i = 0; i < element.length; i++) {
        array[array.length] = element[i]
    }
    return array.length
}



// CASE 1
// Esto de abajo es un bloque, las const solo existirán dentro de él.
{
    var nums = [100, 200, 300, 400, 500]

    var length = push(nums, 600)

    console.log(length)
    // 6
    console.log(nums)
    // [100, 200, 300, 400, 500, 600]
}

// CASE 2
var animals = ['pigs', 'goats', 'sheep'];

var count = animals.push('cows');
console.log(count);
// 4
console.log(animals);
// ["pigs", "goats", "sheep", "cows"]

// CASE 3
var sports = ['football', 'basketball']
var count = push(sports, 'volleyball', 'tennis');
console.log(count)
// 4
console.log(sports);
// ['football', 'basketball', 'volleyball', 'tennis']

// CASE 4
var food = ['apple', 'banana']
var count = push(food)

console.log(count)
// 2
console.log(food)
// ['apple', 'banana']

// CASE 5

var nums = [10, 20, 30]

var length = push(nums, 40, 50, 60)

console.log(length)

console.log(nums)