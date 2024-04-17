describe('logic', function () {
    describe('registerUser', function () {
        it('succeeds a new user', function () {
            db.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')

            var user = db.users.findOne(function (user) {
                return user.username === 'peperoni'
            })

            expect(!!user).toBe(true)
            expect(user.name).toBe('Pepe Roni')
            expect(user.birthdate).toBe('2000-01-01')
            expect(user.email).toBe('pepe@roni.com')
            expect(user.username).toBe('peperoni')
            expect(user.password).toBe('123qwe123')
        })

        it('fails on existing users', function () {
            db.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })

            var errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(Error)
            expect(errorThrown.message).toBe('user already exists')
        })

        it('fails on non string name', function () {
            var errorThrown

            try {
                logic.registerUser(123, '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('name 123 is not a string')
        })

        it('fails on empty name', function () {
            var errorThrown

            try {
                logic.registerUser('', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(Error)
            expect(errorThrown.message).toBe('name >< is empty or blank')
        })

        it('fails on non string birthdate', function () {
            var errorThrown

            try {
                logic.registerUser('Pepe Roni', 123, 'pepe@roni.com', 'peperoni', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(TypeError)
            expect(errorThrown.message).toBe('birthdate 123 is not a string')
        })

        it('fails on incorrect birthdate format', function () {
            var errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000/01/01', 'pepe@roni.com', 'peperoni', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(Error)
            expect(errorThrown.message).toBe('birthdate 2000/01/01 does not have a valid format')
        })

        // TODO add other unhappy test cases
    })

    describe('loginUser', function () {
        it('succeeds on existing user and correct credentials', function () {
            db.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })

            var user = db.users.findOne(function (user) { return user.username === 'peperoni' })

            logic.loginUser('peperoni', '123qwe123')

            expect(sessionStorage.userId).toBe(user.id)

            var user = db.users.findOne(function (user) {
                return user.id === sessionStorage.userId
            })

            expect(user.status).toBe('online')
        })

        it('fails on existing user and incorrect password', function () {
            db.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })

            var errorThrown

            try {
                logic.loginUser('peperoni', '123qwe123qwe')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(Error)
            expect(errorThrown.message).toBe('wrong password')
        })

        it('fails on existing user and incorrect username', function () {
            db.users.deleteOne(function (user) {
                return user.username === 'peperoni'
            })

            db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })

            var errorThrown

            try {
                logic.loginUser('peperoni2', '123qwe123')
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).toBeInstanceOf(Error)
            expect(errorThrown.message).toBe('user not found')
        })
    })

    // TODO test all methods
})