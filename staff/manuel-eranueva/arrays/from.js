// delete Array.prototype.from()

function from(element) {
    newArray = []
    for (var i = 0; i < element.length; i++) {
        newArray[i] = element[i]
    }
    return newArray
}

console.log(from('pepe'))


//Hasta aquí la parte facil, que es desglosar cada caracter de un string como elemento del array