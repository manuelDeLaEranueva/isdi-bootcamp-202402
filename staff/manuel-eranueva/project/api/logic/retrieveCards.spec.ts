//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { User, Card, Book } from '../data/index.ts'

dotenv.config()

const { NotFoundError } = errors

describe('retrieveCards', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    let user, book1, book2

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

                return Promise.all([
                    Book.create({
                        image: '...',
                        name: 'Book 1',
                        author: 'Author 1'
                    }),
                    Book.create({
                        image: '...',
                        name: 'Book 2',
                        author: 'Author 2'
                    })
                ])
            })
            .then(([createdBook1, createdBook2]) => {
                book1 = createdBook1
                book2 = createdBook2

                return Promise.all([
                    Card.create({
                        book: book1.id,
                        owner: user.id,
                        image: 'https://m.media-amazon.com/images/I/71lV0Qc6ApL._AC_UF894,1000_QL80_.jpg',
                        name: 'Hierba',
                        author: 'Keum Suk Gendry-Kim'
                    }),
                    Card.create({
                        book: book2.id,
                        owner: user.id,
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDzvc968j48yhNhxhlboT578obXky8DvpaATodIjItQ&s',
                        name: 'Crisis Zone',
                        author: 'Hanselmann'
                    })
                ])
            })
    )

    it('retrieves all cards for existing user', () =>
        logic.retrieveCards(user.id)
            .then(cards => {
                expect(cards).to.have.lengthOf(2)

                const card1b = cards.find(card => card.book.id.toString() === book1.id.toString())
                expect(card1b.book.name).to.equal('Book 1')
                expect(card1b.book.author).to.equal('Author 1')
                expect(card1b.owner.id.toString()).to.equal(user.id.toString())

                const card2b = cards.find(card => card.book.id.toString() === book2.id.toString())
                expect(card2b.book.name).to.equal('Book 2')
                expect(card2b.book.author).to.equal('Author 2')
                expect(card2b.owner.id.toString()).to.equal(user.id.toString())
            })
    )

    after(() => mongoose.disconnect())
})
