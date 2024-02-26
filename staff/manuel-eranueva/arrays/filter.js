delete Array.prototype.filter

function filter(array, callback) {
    var newArr = [];
    for (var i = 0; i < array.length; i++) {
        if (callback(array[i], i, array) === true) {
            var index = 0
            newArr[newArr.length] = array[i];
            index++;

        }
    }
    return newArr
}
var words = ['spray', 'elite', 'exuberant', 'destruction', 'present'];

var result = filter(words, function (elements) {

    return elements.length > 6
});





console.log('CASE 1, should return an array with ["exuberant", "destruction", "present"] in it')
console.assert(result[0] === 'exuberant');
console.assert(result[1] === 'destruction');
console.assert(result[2] === 'present');
console.assert(result.length === 3, 'length')

console.assert(words[0] === 'spray');
console.assert(words[1] === 'elite');
console.assert(words[2] === 'exuberant');
console.assert(words[3] === 'destruction');
console.assert(words[4] === 'present');
console.assert(words.length === 5)


// Expected output: Array ["exuberant", "destruction", "present"]

console.log(result)