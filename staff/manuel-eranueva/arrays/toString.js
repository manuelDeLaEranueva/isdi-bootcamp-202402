delete Array.prototype.toString()

function toString(array) {
    var string = ''

    for (var i = 0; i < array.length; i++) {
        string += array[i];
    }

    return string;
}


const z = [1, 2, 3, 4];
const string1 = toString(z);
console.log(string1); // Salida: "1234" 