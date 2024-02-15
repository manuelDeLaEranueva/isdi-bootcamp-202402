delete String.prototype.concat

function concat(string1, string2) {
    var string3 = ''

    string3 = string1 + '' + string2
    return string3
}




var string1 = 555
var string2 = 5552

var string3 = concat(string1, string2);
console.log(string3);