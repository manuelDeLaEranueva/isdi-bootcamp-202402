function split(string, separator) {
    var word = ''
    var list = []
    for (var i = 0; i < string.length; i++) {
        var char = string[i]
        if (char === separator) {
            list[list.length](word)
            word = ''
        } else {
            word = word + char
        }
    }
    list[list.length](word)
    return list
}

// CASE
var s = 'hola mundo'

var words = split(s, ' ')
console.log(words)
// ['hola', 'mundo']