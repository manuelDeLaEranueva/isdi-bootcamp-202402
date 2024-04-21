import dotenv from 'dotenv'

import mongoose from 'mongoose'
import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { Types: { ObjectId } } = mongoose
const { NotFoundError } = errors

describe('retrieveUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('retrieves existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(user.id, user2.id))
                    .then(user => {
                        expect(user.name).to.equal('Pepe Phone')
                        expect(user.username).to.equal('pepephone')
                    })
            )

    )

    it('does no retrieve by non-existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            )
    )

    it('does no retrieve a non-existing target user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Pepe Phone', birthdate: '2000-01-01', email: 'pepe@phone.com', username: 'pepephone', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(user.id, new ObjectId().toString()))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            )
    )

    // TODO test all methods

    after(() => mongoose.disconnect())
})