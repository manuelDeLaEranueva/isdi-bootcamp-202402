delete Array.prototype.shift()

function shift(array) {

    var firstElement = array[0]
    for (let i = 0; i < array.length - 1; i++) {
        array[i] = array[i + 1]
    }
    array.length--;
    return firstElement;
}

var z = [2, 'a', 6];
console.log(shift(z)); // Output: 2
console.log(z); // Output: [4, 6]