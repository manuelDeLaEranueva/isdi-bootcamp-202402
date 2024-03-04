var matcha = require('./matcha')

var Arroz = require('./Arroz')

matcha.describe('Arroz', function () {
    matcha.describe('> constructor', function () {
        matcha.it('should construct', function () {
            var a = new Arroz

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(0)
        })

        matcha.it('should construct with multiple values', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(3)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(30)
        })

        matcha.it('should construct with one non-numeric value', function () {
            var a = new Arroz(true)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(1)
            matcha.expect(a[0]).toBe(true)
        })

        matcha.it('should construct with one numeric value', function () {
            var a = new Arroz(5)

            matcha.expect(a).toBeInstanceOf(Arroz)
            matcha.expect(a.length).toBe(5)
            for (var i = 0; i < a.length; i++)
                matcha.expect(a[i]).toBe(undefined)
        })
    })

    matcha.describe('> push', function () {
        matcha.it('should push a value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.push).toBe(true)

            var length = a.push(40)

            matcha.expect(a.length).toBe(4)
            matcha.expect(a[a.length - 1]).toBe(40)
            matcha.expect(length).toBe(4)
        })

        matcha.it('should push many values', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.push).toBe(true)

            var length = a.push(40, 50, 60, 70)

            matcha.expect(a.length).toBe(7)
            matcha.expect(a[3]).toBe(40)
            matcha.expect(a[4]).toBe(50)
            matcha.expect(a[5]).toBe(60)
            matcha.expect(a[6]).toBe(70)
            matcha.expect(length).toBe(7)
        })
    })

    matcha.describe('> pop', function () {
        matcha.it('should extract last value', function () {
            var a = new Arroz(10, 20, 30)

            matcha.expect(!!a.pop).toBe(true)

            var value = a.pop()

            matcha.expect(a.length).toBe(2)
            matcha.expect(a[0]).toBe(10)
            matcha.expect(a[1]).toBe(20)
            matcha.expect(a[2]).toBe(undefined)
            matcha.expect(value).toBe(30)
        })
    })

    matcha.describe('> toString', function () {
        matcha.it('should convert to string', function () {
            var a = new Arroz(10, 20, 30, 40, 50)

            matcha.expect(!!a.toString).toBe(true)

            var string = a.toString()

            matcha.expect(string).toBe('Arroz [10, 20, 30, 40, 50]')
        })
    })

    matcha.describe('> at', function () {
        matcha.it('should find the element at the second index of [1, 2, 3, 4]', function () {
            var a = new Arroz(1, 2, 3, 4)

            matcha.expect(!!a.at).toBe(true)

            var found = a.at(3)

            matcha.expect(found).toBe(4)
        })
    })

    matcha.describe('> at', function () {
        matcha.it('should return undefined because the index is bigger than Arroz.length - 1', function () {
            var a = new Arroz(1, 2, 3, 4)

            matcha.expect(!!a.at).toBe(true)

            var found = a.at(4)

            matcha.expect(found).toBe(undefined)
        })
    })

    matcha.describe('> at', function () {
        matcha.it('should return 4 with index -1', function () {
            var a = new Arroz(1, 2, 3, 4)

            matcha.expect(!!a.at).toBe(true)

            var found = a.at(-2)

            matcha.expect(found).toBe(3)
        })
    })

    matcha.describe('> reverse', function () {
        matcha.it('should return "Arroz [c, b, a]"', function () {
            var a = new Arroz('a', 'b', 'c')

            matcha.expect(!!a.reverse).toBe(true)

            var found = a.reverse()

            matcha.expect(found[0]).toBe('c')
            matcha.expect(found[1]).toBe('b')
            matcha.expect(found[2]).toBe('a')
        })
    })


})
