delete Array.prototype.includes

function includes(array, value, fromIndex) {
    if (arguments.length < 3) {
        for (var i = 0; i < array.length; i++) {
            var element = array[i]

            if (element === value)
                return true
        }

        return false
    } else {
        if (fromIndex > -1) {
            for (var i = fromIndex; i < array.length; i++) {
                var element = array[i]

                if (element === value)
                    return true
            }

            return false
        } else {
            var newIndex = array.length + fromIndex

            for (var i = newIndex; i < array.length; i++) {
                var element = array[i]

                if (element === value)
                    return true
            }

            return false
        }
    }
}

console.log('CASE 1')

var nums = [100, 200, 300, 400, 500]

var result = includes(nums, 600)

console.log(result)
// false

console.log('CASE 2')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = includes(animals, 'sheep')

console.log(result)
// true

console.log('CASE 3')

var nums = [10, 20, 30]

var result = includes(nums, 30, 3)

console.log(result)
// false

console.log('CASE 4')

var nums = [10, 20, 30]

var result = includes(nums, 30, 1)

console.log(result)
// true

console.log('CASE 5')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = includes(animals, 'cows', 2)

console.log(result)
// true

console.log('CASE 6')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = includes(animals, 'goats', 2)

console.log(result)
// false


console.log('CASE 7')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = includes(animals, 'goats', -3)

console.log(result)
// true

console.log('CASE 8')

var animals = ['pigs', 'goats', 'sheep', 'cows']

var result = includes(animals, 'goats', -2)

console.log(result)
// false