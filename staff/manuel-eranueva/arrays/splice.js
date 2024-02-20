delete Array.prototype.splice()

function splice(array, ...elements) {
    for (var i = elements.length - 1; i >= 0; i--) {
        array.unshift(elements[i]);
    }
    return array.length;
}

// Ejemplo de uso:
var nums = [100, 200, 300, 400, 500];
var length = splice(nums, 50, 60, 70);

console.log(length); // 8
console.log(nums); // [50, 60, 70, 100, 200, 300, 400, 500]

var flowers = ['daisy', 'hyacinth', 'poppy']
var length = splice(flowers, 'lily', 'bluebell', 'lavender');

console.log(flowers); // 6
console.log(length); // [ 'lily', 'bluebell', 'lavender', 'daisy', 'hyacinth', 'poppy' ]