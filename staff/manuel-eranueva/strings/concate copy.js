delete String.prototype.concat

function concat(...string) {
    var fullString = ''
    for (i = 0; i < string.length; i++) {
        fullString += string[i]

    }
    return fullString
}
var string1 = 555
var string2 = 5552
var string3 = ' Hola '
var string4 = 'buenos '
var string5 = 'días. '
var string6 = true

var fullString = concat(string1, string2, ' ', 123, 45, string3, string4, string5, string6, ' taluego');
console.log(fullString);