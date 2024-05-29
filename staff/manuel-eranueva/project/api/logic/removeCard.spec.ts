//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { User, Card, Book } from '../data/index.ts'

dotenv.config()

const { SystemError, NotFoundError } = errors

describe('removeCard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    let user, anotherUser, book, card

    beforeEach(() =>
        Promise.all([User.deleteMany(), Card.deleteMany(), Book.deleteMany()])
            .then(() =>
                User.create({
                    name: 'Pepe Roni',
                    email: 'pepe@roni.com',
                    username: 'peperoni',
                    password: '123qwe123'
                })
            )
            .then(createdUser => {
                user = createdUser

                return User.create({
                    name: 'Another User',
                    email: 'another@user.com',
                    username: 'anotheruser',
                    password: '123qwe123'
                })
            })
            .then(createdAnotherUser => {
                anotherUser = createdAnotherUser

                return Book.create({
                    image: 'https://example.com/tekkon-kinkreet.jpg',
                    name: 'Tekonkinkreet',
                    author: 'Matsumoto'
                })
            })
            .then(createdBook => {
                book = createdBook

                return Card.create({
                    book: book._id,
                    owner: user._id
                })
            })
            .then(createdCard => {
                card = createdCard
            })
    )

    it('removes card for existing user', () =>
        logic.removeCard(user._id.toString(), card._id.toString())
            .then(() => Card.findById(card._id))
            .then(foundCard => {
                expect(foundCard).to.be.null
            })
    )

    it('throws NotFoundError if user does not exist', () =>
        logic.removeCard('000000000000000000000000', card._id.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('user does not exist')
            })
    )

    it('throws NotFoundError if card does not exist', () =>
        logic.removeCard(user._id.toString(), '000000000000000000000000')
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('card not found')
            })
    )

    it('throws NotFoundError if card does not belong to user', () =>
        logic.removeCard(anotherUser._id.toString(), card._id.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('card does not belong to user')
            })
    )

    after(() => mongoose.disconnect())
})
