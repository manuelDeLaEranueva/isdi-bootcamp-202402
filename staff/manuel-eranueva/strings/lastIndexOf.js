delete String.prototype.lastIndexOf()

function lastIndexOf(string, searchString) {
    debugger
    var len = searchString.length;
    var quote = ''
    var start = 0
    for (var i = string.length; i >= 0; i--) {
        if (string[i] === searchString[0] && len === 1) {
            return i;
        } else if (string[i] === searchString[0] && len > 1) {
            quote = string[i]
            for (var j = 1; j < len; j++) {
                quote += string[i + j]
                start = i
            }
        }
        if (quote === searchString) {
            return start
        }

    }
    return -1
}

// CASE 1

var s = 'hola mundo'

var index = lastIndexOf(s, 'o')

console.log(index)
// 9

// CASE 2

var s = 'hola mundo'

var index = lastIndexOf(s, 'ol')

console.log(index)
// 1