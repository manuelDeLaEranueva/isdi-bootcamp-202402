function Arroz() {
    if (arguments.length !== 1) {
        this.length = arguments.length

        for (var i = 0; i < arguments.length; i++) {
            var argument = arguments[i]

            this[i] = argument
        }
    } else {
        var argument = arguments[0]

        if (typeof argument === 'number') {
            this.length = argument

            return
        }

        this[0] = argument
        this.length = 1
    }
}

Arroz.prototype.push = function () {
    for (var i = 0; i < arguments.length; i++) {
        var argument = arguments[i]

        this[this.length] = argument
        this.length++
    }

    return this.length
}

Arroz.prototype.pop = function () {
    var lastIndex = this.length - 1

    var last = this[lastIndex]

    delete this[lastIndex]

    this.length--

    return last
}

Arroz.prototype.toString = function () {
    var string = 'Arroz ['

    for (var i = 0; i < this.length; i++) {
        var element = this[i]

        string += element

        if (i < this.length - 1)
            string += ', '
    }

    string += ']'

    return string
}

Arroz.prototype.at = function (index) {
    if (index < this.length && index > -1) {
        return this[index]
    } else if (index > this.length - 1) {
        return undefined;
    } else {
        return this[index + this.length]
    }
}

Arroz.prototype.reverse = function () {
    var found = ['']

    for (var i = this.length - 1; i >= 0; i--) {
        found[this.length - 1 - i] = this[i]
    }

    return found
}

module.exports = Arroz