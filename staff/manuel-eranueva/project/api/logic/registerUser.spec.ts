import dotenv from 'dotenv'

import mongoose from 'mongoose'

import { User } from '../data/index.ts'

import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

dotenv.config()

const { DuplicityError } = errors

describe('registerUser', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('succeeds a new user', () =>
        User.deleteMany()
            .then(() => logic.registerUser('Ego', 'hola@buenas.com', 'Ego', '123qwe123'))
            .then(() => User.findOne({ username: 'Ego' }))
            .then(user => {
                expect(!!user).to.be.true
                expect(user.name).to.equal('Ego')
                expect(user.email).to.equal('hola@buenas.com')
                expect(user.username).to.equal('Ego')
                expect(user.password).to.equal('123qwe123')

            })
    )

    it('fails on existing users', () =>
        User.deleteMany()
            .then(() => User.create({ name: 'Ego', email: 'hola@buenas.com', username: 'Ego', password: '123qwe123' }))
            .then(() =>
                logic.registerUser('Ego', 'hola@buenas.com', 'Ego', '123qwe123')
                    .catch(error => {
                        expect(error).to.be.instanceOf(DuplicityError)
                        expect(error.message).to.equal('user already exists')
                    })
            )
    )

    it('fails on non string name', () => {
        let errorThrown

        try {
            //@ts-ignore
            logic.registerUser(123, 'hola@buenas.com', 'Ego', '123qwe123')
        } catch (error) {
            errorThrown = error
        }
        expect(errorThrown).to.be.instanceOf(TypeError)
        expect(errorThrown.message).to.equal('name 123 is not a string')
    })

    it('fails on empty name', () => {
        let errorThrown

        try {
            logic.registerUser('', 'hola@buenas.com', 'Ego', '123qwe123')
        } catch (error) {
            errorThrown = error
        }

        expect(errorThrown).to.be.instanceOf(Error)
        expect(errorThrown.message).to.equal('name >< is empty or blank')
    })
    after(() => mongoose.disconnect())

})
