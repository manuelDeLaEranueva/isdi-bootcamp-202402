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

console.log(result);
// Expected output: Array ["exuberant", "destruction", "present"]

