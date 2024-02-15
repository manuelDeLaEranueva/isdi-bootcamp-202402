function isArray(value) {
    return value instanceof Array;
}

console.log(isArray([1, 2, 3])); // true
console.log(isArray({ foo: 123 })); // false
console.log(isArray("foobar")); // false
console.log(isArray(undefined)); // false

//TRUE
console.log(isArray([]))
console.log(isArray([1]))
console.log(isArray(new Array()))
console.log(isArray(new Array("a", "b", "c", "d")))
console.log(isArray(new Array(3)))

//FALSE
console.log(isArray())
console.log(isArray({}))
console.log(isArray(null))
console.log(isArray(undefined))
console.log(isArray(17))
console.log(isArray("Array"))
console.log(isArray(true))
console.log(isArray(false))