import db from '../data/index.mjs'
import logic from './index.mjs'

import { expect } from 'chai'

describe('logic', () => {
    describe('registerUser', () => {
        it('succeeds a new user', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    db.users.findOne(user => user.username === 'peperoni', (error, user) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(!!user).to.be.true
                        expect(user.name).to.equal('Pepe Roni')
                        expect(user.birthdate).to.equal('2000-01-01')
                        expect(user.email).to.equal('pepe@roni.com')
                        expect(user.username).to.equal('peperoni')
                        expect(user.password).to.equal('123qwe123')

                        done()
                    })
                })
            })
        })

        it('fails on existing users', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.registerUser('Pepe Roni', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', error => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user already exists')

                        done()
                    })
                })
            })
        })

        it('fails on non string name', () => {
            let errorThrown

            try {
                logic.registerUser(123, '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('name 123 is not a string')
        })

        it('fails on empty name', () => {
            let errorThrown

            try {
                logic.registerUser('', '2000-01-01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('name >< is empty or blank')
        })

        it('fails on non string birthdate', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', 123, 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(TypeError)
            expect(errorThrown.message).to.equal('birthdate 123 is not a string')
        })

        it('fails on incorrect birthdate format', () => {
            let errorThrown

            try {
                logic.registerUser('Pepe Roni', '2000/01/01', 'pepe@roni.com', 'peperoni', '123qwe123', () => { })
            } catch (error) {
                errorThrown = error
            }

            expect(errorThrown).to.be.instanceOf(Error)
            expect(errorThrown.message).to.equal('birthdate 2000/01/01 does not have a valid format')
        })

        // TODO add other unhappy test cases
    })

    describe('loginUser', () => {
        it('succeeds on existing user and correct credentials', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.loginUser('peperoni', '123qwe123', (error, userId) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(userId).to.equal(insertedUserId)

                        db.users.findOne(user => user.id === userId, (error, user) => {
                            if (error) {
                                done(error)

                                return
                            }

                            expect(user.status).to.equal('online')

                            done()
                        })
                    })
                })
            })
        })

        it('fails on existing user and incorrect password', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.loginUser('peperoni', '123qwe123qwe', (error, userId) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('wrong password')
                        expect(userId).to.be.undefined

                        done()
                    })
                })
            })
        })

        it('fails on existing user and incorrect username', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.loginUser('peperoni2', '123qwe123', (error, userId) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        expect(userId).to.be.undefined

                        done()
                    })
                })
            })
        })
    })

    describe('retrieveUser', () => {
        it('retrieves existing user', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser(insertedUserId, (error, user) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(user.id).to.be.undefined
                        expect(user.username).to.equal('peperoni')
                        expect(user.email).to.equal('pepe@roni.com')
                        expect(user.birthdate).to.equal('2000-01-01')
                        expect(user.password).to.be.undefined
                        expect(user.status).to.be.undefined

                        done()
                    })
                })
            })
        })

        it('does no retrieve a non-existing user', done => {
            db.users.deleteOne(user => user.username === 'peperoni', error => {
                if (error) {
                    done(error)

                    return
                }

                db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
                    if (error) {
                        done(error)

                        return
                    }

                    logic.retrieveUser('wrong-id', (error, user) => {
                        expect(error).to.be.instanceOf(Error)
                        expect(error.message).to.equal('user not found')

                        expect(user).to.be.undefined

                        done()
                    })
                })
            })
        })
    })

    // TODO test all methods
})