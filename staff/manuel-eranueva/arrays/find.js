delete Array.prototype.find

function find(array, callback) {
    for (var i = 0; i < array.length + 1; i++) {
        if (callback(array[i]) === true)
            return array[i]


    }
    return undefined
}

console.log('CASE 1')

nums = [1, 2, 3, 4, 5];

var result = find(nums, function (element) {
    return element > 3;
})
console.log(result)
console.log('return 4')

console.log('CASE 2')

nums = [10, 20, 30, 40, 50];

var result = find(nums, function (element) {
    return element > 30;
})
console.log(result)
console.log('return 40')