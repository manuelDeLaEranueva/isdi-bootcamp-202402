delete String.prototype.startsWith()

function startsWith(string, searchString) {
    // TODO implement me
    var part = '';
    for (var i = 0; i < searchString.length; i++) {
        part = part + string[i];
    }
    if (part === searchString) return true
    return false
}

// CASE 1

var s = 'hola mundo'

var result = startsWith(s, 'hol')

console.log(result)
// true

// CASE 2

var s = 'hola mundo'

var result = startsWith(s, 'halo')

console.log(result)
// false