function concat(element1, element2) {
    var fullArray = [];

    for (var i = 0; i < element1.length; i++) {
        fullArray[i] = element1[i];
    }

    for (var j = 0; j < element2.length; j++) {
        fullArray[element1.length + j] = element2[j];
    }

    return fullArray;
}

var element1 = [555, 867];
var element2 = [' sdvdvs66', 34, 6, 6, 7, 8];

var fullArray = concat(element1, element2);
console.log(fullArray);