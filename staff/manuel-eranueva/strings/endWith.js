delete String.prototype.endsWith

function endsWith(string, searchString) {
    var len = searchString.length
    var part = ''
    for (var i = 0; i < len; i++) {
        part += string[i];
    }
    if (part === searchString) return true
    return false
}

// CASE 1

var s = 'hola mundo'

var result = endsWith(s, 'do')

console.log(result)
// true

// CASE 2


console.log(endsWith(s, 'hes'))
// false