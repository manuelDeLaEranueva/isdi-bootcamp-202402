function indexOf(object, value) {
    // TODO

    for (var i = 0; i < object.length; i++) {
        var elem = object[i]

        if (elem === value)
            return i
    }

    return -1
}

console.log('CASE 1: index of blue in colors')

var colors = {
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}

var index = indexOf(colors, 'blue')

console.log(index)
// 1

console.log(colors)
/*
{
    0: 'red',
    1: 'blue',
    2: 'green',
    length: 3
}
*/