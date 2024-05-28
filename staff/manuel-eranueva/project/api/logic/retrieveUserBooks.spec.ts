//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import sinon from 'sinon'
import { errors } from 'com'
import { User, Book, MyBookself } from '../data/index.ts'

dotenv.config()

const { SystemError, NotFoundError } = errors

describe('retrieveUserBooks', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    let user, book1, book2, book3

    beforeEach(() =>
        Promise.all([User.deleteMany(), MyBookself.deleteMany(), Book.deleteMany()])
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
                        image: 'https://example.com/tekkon-kinkreet.jpg',
                        name: 'Tekonkinkreet',
                        author: 'Matsumoto'
                    }),
                    Book.create({
                        image: 'https://example.com/hierba.jpg',
                        name: 'Hierba',
                        author: 'Keum Suk Gendry-Kim'
                    }),
                    Book.create({
                        image: 'https://example.com/crisis-zone.jpg',
                        name: 'Crisis Zone',
                        author: 'Hanselmann'
                    })
                ])
            })
            .then(([createdBook1, createdBook2, createdBook3]) => {
                book1 = createdBook1
                book2 = createdBook2
                book3 = createdBook3

                return Promise.all([
                    MyBookself.create({
                        book: book1._id,
                        owner: user._id
                    }),
                    MyBookself.create({
                        book: book2._id,
                        owner: user._id
                    }),
                    MyBookself.create({
                        book: book3._id,
                        owner: user._id
                    })
                ])
            })
    )

    it('retrieves all books from user', () =>
        logic.retrieveUserBooks(user._id.toString())
            .then(books => {
                expect(books).to.have.lengthOf(3)

                const book1b = books.find(book => book.book._id.toString() === book1._id.toString())
                expect(book1b.book.name).to.equal('Tekonkinkreet')
                expect(book1b.book.author).to.equal('Matsumoto')
                expect(book1b.owner._id.toString()).to.equal(user._id.toString())

                const book2b = books.find(book => book.book._id.toString() === book2._id.toString())
                expect(book2b.book.name).to.equal('Hierba')
                expect(book2b.book.author).to.equal('Keum Suk Gendry-Kim')
                expect(book2b.owner._id.toString()).to.equal(user._id.toString())

                const book3b = books.find(book => book.book._id.toString() === book3._id.toString())
                expect(book3b.book.name).to.equal('Crisis Zone')
                expect(book3b.book.author).to.equal('Hanselmann')
                expect(book3b.owner._id.toString()).to.equal(user._id.toString())
            })
    )



    it('returns an empty array if the user has no books', () =>
        User.create({
            name: 'John Doe',
            email: 'john@doe.com',
            username: 'johndoe',
            password: '123456'
        }).then(newUser =>
            logic.retrieveUserBooks(newUser._id.toString())
                .then(books => {
                    expect(books).to.have.lengthOf(0)
                })
        )
    )

    after(() => mongoose.disconnect())
})
