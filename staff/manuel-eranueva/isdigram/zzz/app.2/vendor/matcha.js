console.log('MATCHA 🍵 v0.1')

var matcha = {}

var logs = []

function describe(title, callback) {
    logs[logs.length] = title
    console.log(title)

    callback()
}

function it(title, callback) {
    var log = '* ' + title

    logs[logs.length] = log
    console.log(log)

    callback()
}

function expect(value) {
    return {
        toBe: function (expected) {
            var matches = value === expected

            if (!matches) {
                var log = '❌ ' + value + ' to be ' + expected

                logs[logs.length] = log
                console.error(log)

                return false
            }

            var log = '✅ ' + value + ' to be ' + expected

            logs[logs.length] = log
            console.info(log)

            return true
        },

        toBeInstanceOf: function (expected) {
            var matches = value instanceof expected

            if (!matches) {
                var log = '❌ ' + value + ' to be instance of ' + expected.name

                logs[logs.length] = log
                console.error(log)

                return false
            }

            var log = '✅ ' + value + ' to be instance of ' + expected.name

            logs[logs.length] = log
            console.info(log)

            return true
        }
    }
}

matcha.logs = logs
matcha.describe = describe
matcha.it = it
matcha.expect = expect

if (typeof module !== 'undefined')
    module.exports = matcha

