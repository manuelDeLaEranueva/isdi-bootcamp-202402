delete String.prototype.trim

function trim(string) {
    // TODO implement me

    for (let i = 0; i < string.length; i++) {
        if (string[i] === ' ')
            return string - string[i];

    }

}

// CASE 1
var s = '  hola mundo   '

var result = trim(s)

console.log(result)
// 'hola mundo'

// CASE 2

// var s = ' \n\s\r hola mundo \n\s\r '

// var result = trim(s)

// console.log(result)
// 'hola mundo'