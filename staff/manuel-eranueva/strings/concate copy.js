delete String.prototype.concat

function concat(string1, string2) {
    var string3 = ''
    if (string1 == Number && string2 == Number) {
        string3 = string1.toString() + string2
    } else {
        string3 = string1 + string2
    }
    return string3
}

var string1 = 555
var string2 = 5552

var string3 = concat(string1, string2);
console.log(string3);