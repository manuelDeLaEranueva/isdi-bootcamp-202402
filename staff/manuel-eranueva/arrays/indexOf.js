delete Array.prototype.indexOf()

function indexOf(array, element, index) {
    if (index === undefined) {
        index = 0;
    }
    for (var i = index; i < array.length; i++) {
        if (array[i] === element) {
            return i
        }
    }
    //AQUÍ AL LORO. Había dejado el return -1 dentro del for, por lo que nunca llegaba a ejecutarse.
    return -1
}

var z = ['tardes', 'buenas', 'buenas', 'buenas', 'buenas', 'tardes']

var index = indexOf(z, 'tardes')

console.log(index)//0

var index = indexOf(z, 'tardes', 1)

console.log(index)//5

var index = indexOf(z, 'tardes', 4)

console.log(index)//5

var index = indexOf(z, 'dias')

console.log(index)//-1

var y = [2, 9, 9];
var index = indexOf(y, 2);
console.log(index) // 0
var index = indexOf(y, 7);
console.log(index)// -1
var index = indexOf(y, 9, 2);
console.log(index)// 2
var index = indexOf(y, 2, -1);
console.log(index)// -1 OJO ESTE NO FUNCIONA
var index = indexOf(y, 2, -3);
console.log(index)// 0