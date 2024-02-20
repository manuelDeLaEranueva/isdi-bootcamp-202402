delete Array.prototype.lastIndexOf

function lastIndexOf(array, search, index) {
    if (isNaN(search)) {
        return -1
    } else if (index === undefined || index > array.length - 1 || (index < 0 && (index * -1) > array.length)) {
        for (var i = array.length - 1; i > -1; i--) {
            if (array[i] === search)
                return i
        }
        return -1
    } else if (index > -1 && index < array.length) {
        for (var i = array.length - 1; i > index - 1; i--) {
            if (array[i] === search)
                return i
        }
        return -1
    } else if (index < 0 && (index * -1) < array.length) {
        for (var i = array.length + index; i > - 1; i--) {
            if (array[i] === search)
                return i
        }
        return -1
    }
}

//CASE 1

let arr = [1, 2, 3]
let result = lastIndexOf(arr, 3)
console.log(result)
//1

//CASE 2

result = lastIndexOf(arr, 6)
console.log(result)
//-1

//CASE 3

result = lastIndexOf(arr, NaN)
console.log(result)
//-1

//CASE 4

result = lastIndexOf(arr, 3, 1)
console.log(result)
//2

//CASE 5

result = lastIndexOf(arr, 1, 2)
console.log(result)
//-1

//CASE 6

result = lastIndexOf(arr, 1, 7)
console.log(result)
//0

//CASE 7

result = lastIndexOf(arr, 3, -1)
console.log(result)
//2

//CASE 8

result = lastIndexOf(arr, 1, -7)
console.log(result)
//0