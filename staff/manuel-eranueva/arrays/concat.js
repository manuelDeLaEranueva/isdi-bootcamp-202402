delete Array.prototype.concat

function concat(array, ...element) {
    var fullArray = [];

    for (var i = 0; i < array.length; i++) {
        fullArray[i] = array[i];
    }

    for (var j = 0; j < element.length; j++)
        if (element[i] instanceof Array) {
            fullArray[array.length + j] = element[j];
        }

    return fullArray;
}


console.log('CASE 1: concat 2 arrays')

var array = [555, 867];
var element = [' sdvdvs66', 34, 6, 6, 7, 8];

var fullArray = concat(array, element)
console.log(fullArray)

console.assert(fullArray = "[ 555, 867, ' sdvdvs66', 34, 6, 6, 7, 8 ]", 'fullArray must equal to de addition of the 2 small arrays')

console.log('CASE 2: concat 4 arrays')

var arr1 = ['In', 'the', 'same', 'old', 'town']
var arr2 = ['I', 'saw', 'your', 'face']
var arr3 = ['You', 'seemed', 'so', 'sad']
var arr4 = ['I', 'felt', 'the', 'same']

var fullArray = concat(arr1, arr2, arr3, arr4);

console.log(fullArray)