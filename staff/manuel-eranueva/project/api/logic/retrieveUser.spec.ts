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
            .then(() => User.create({ name: 'MANUEL', email: 'hola@buenas.com', username: 'ego', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Manuel', email: 'yop@gmail.com', username: 'manuSanti', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(user.id, user2.id))
                    .then(user => {
                        expect(user.name).to.equal('Manuel')
                        expect(user.username).to.equal('manuSanti')
                    })
            )

    )

    it('does no retrieve by non-existing user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'MANUEL', email: 'hola@buenas.com', username: 'ego', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Manu ', email: 'yop@gmail.com', username: 'Manu', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(new ObjectId().toString(), user2.id))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('user not found')
                    })
            )
    )

    it('does no retrieve a non-existing target user', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'MANUEL', email: 'hola@buenas.com', username: 'ego', password: '123qwe123' }))
            .then(user =>
                User.create({ name: 'Manu ', email: 'yop@gmail.com', username: 'Manu', password: '123qwe123' })
                    .then(user2 => logic.retrieveUser(user.id, new ObjectId().toString()))
                    .catch(error => {
                        expect(error).to.be.instanceOf(NotFoundError)
                        expect(error.message).to.equal('target user not found')
                    })
            )
    )

    after(() => mongoose.disconnect())
})