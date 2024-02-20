function map(array, callback) {
    var newArr = []

    for (var i = 0; i < array.length; i++) {
        var element = array[i]

        newArr[newArr.length] = callback(element, i, array)
    }
    return newArr

}

'CASE 1'

var nums = [10, 20, 30, 40, 50]

var numsX100 = map(nums, function (num) {
    return num * 100
})

console.log(numsX100)
// [1000, 2000, 3000, 4000, 5000]
console.log(nums)
// [10, 20, 30, 40, 50]

console.log('CASE 2')

var chars = ['a', 'b', 'c']

var charsInUpper = map(chars, function (char) {
    return char.toUpperCase()
})

console.log(charsInUpper)
// ['A', 'B', 'C']
console.log(chars)
// ['a', 'b', 'c']

console.log('CASE 3')

var chars = ['a', 'b', 'c']

var charsInUpper = map(chars, function (char) {
    return char.toUpperCase()
})

console.log(charsInUpper)
// ['A', 'B', 'C']
console.log(chars)
// ['a', 'b', 'c']


console.log('CASE 4')

var nums = [10, 20, 30]

var result = map(nums, function (element, index, array) {
    return element + ', ' + index + ', [' + array + ']'
})

console.log(result)
//['10, 0, [10,20,30]', '20, 1, [10,20,30]', '30, 2, [10,20,30]']

console.log(nums)
// [10, 20, 30]


console.log('CASE 5')

var data = [
    { name: 'Peter', mark: 9 },
    { name: 'Wendy', mark: 9.6 },
    { name: 'Pepito', mark: 6 },
    { name: 'Campa', mark: 7 }
]

function calculateCake(element, index, array) {
    // ex: (7/31.6 * 100).toFixed(2)

    var sum = 0

    for (var i = 0; i < array.length; i++) {
        var item = array[i]

        sum += item.mark
    }

    var piece = parseFloat((element.mark / sum * 100).toFixed(2))

    return { name: element.name, piece: piece }
}

var cake = map(data, calculateCake)

console.log(cake)
/*
[
    { name: 'Peter', piece:  },
    { name: 'Wendy', piece:  },
    { name: 'Pepito', piece:  },
    { name: 'Campa', piece:  }
]
*/

console.log(data)
/*
[
    { name: 'Peter', mark: 9 },
    { name: 'Wendy', mark: 9.6 },
    { name: 'Pepito', mark: 6 },
    { name: 'Campa', mark: 7 }
]
*/