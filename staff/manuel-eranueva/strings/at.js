delete String.prototype.at

function at(string, index) {
    //Crear una variable auxiliar con el caracter a extraer (char)
    //Primero, comprobar si el índice es positivo o negativo, plantear dos flujos.
    //En caso que el índice sea positivo, sabemos que extraemos la posición directamente desde el índice (el carácter en este caso), y asignarlo a 'char'
    //En caso de que el índice sea negativo, empezaremos a recorrer el string desde su última posición. Restando a la longitud del string el valor del índice.
    //Retornar el valor de 'char'
    var char
    if (index >= 0) {
        char = string[index]
    } else {
        var newIndex = string.length + index
        char = string[newIndex]
    }
    return char
}

// CASE 1

var s = 'hola mundo'

var char = at(s, -3)
console.log(char)

// 'u'

// CASE 2

// var s = 'hola mundo'

// var char = at(s, 20)
// // undefined

// // CASE 3

// var s = 'hola mundo'

// var char = at(s, -4)
// // 'u'