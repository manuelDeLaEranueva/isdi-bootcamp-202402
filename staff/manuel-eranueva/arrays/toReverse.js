delete Array.prototype.toReversed()

function toReversed(array) {
    var reversedArray = [''];

    for (var i = array.length - 1; i >= 0; i--) {
        reversedArray[array.length - 1 - i] = array[i];
    }

    return reversedArray;
}

var z = [1, 2, 3, 4];
var aarray1 = toReversed(z);
console.log(aarray1); // [4, 3, 2, 1]