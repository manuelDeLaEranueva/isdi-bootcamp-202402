delete String.prototype.indexOf

function indexOf(string, searchString) {
    var len = searchString.length;
    var quote = ''
    var start = 0
    for (var i = 0; i < string.length; i++) {
        if (string[i] === searchString[0] && len === 1) {
            return i
        } else if (string[i] === searchString[0] && len > 1) {
            start = i
            quote = string[i]
            for (var j = 1; j < len; j++) {
                quote += string[i + j]
            }
            if (quote === searchString) {
                return start
            } return -1;
        }
    }
}

// CASE 1

var s = 'hola mundo'

var index = indexOf(s, 'ola')

console.log(index)
// 1

// CASE 2

var s = 'hola mundo'

var index = indexOf(s, 'olaf')

console.log(index)
// -1