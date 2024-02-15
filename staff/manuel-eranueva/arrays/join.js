delete Array.prototype.join

function join(array, separator) {
    var string = ''

    for (var i = 0; i < array.length; i++) {
        if (i === array.length - 1) {
            string += array[i]
        } else {
            string += array[i] + separator;
        }

    }
    return string;
}


const z = [1, 4, 'abc', true]
const string1 = join(z, ' >_< ')
console.log(string1); // Salida: "1-2-3-4"