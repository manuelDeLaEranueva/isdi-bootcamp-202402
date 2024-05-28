//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { User, Book, MyBookself } from '../data/index.ts'

dotenv.config()

const { NotFoundError, SystemError } = errors

describe('removeBookFromBookshelf', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    let user
    let book1
    let book2

    beforeEach(() =>
        Promise.all([User.deleteMany(), Book.deleteMany(), MyBookself.deleteMany()])
            .then(() => {
                return User.create({
                    name: 'Pepe Roni',
                    email: 'pepe@roni.com',
                    username: 'peperoni',
                    password: '123qwe123'
                })
            })
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
                    MyBookself.create({
                        book: book1._id,
                        owner: user._id
                    }),
                    MyBookself.create({
                        book: book2._id,
                        owner: user._id
                    })
                ])
            })
    )

    it('removes a book from the user\'s bookshelf', () =>
        logic.removeBookFromBookshelf(user._id.toString(), book1._id.toString())
            .then(() => MyBookself.find({ owner: user._id }))
            .then(books => {
                expect(books).to.have.lengthOf(1)
                expect(books[0].book.toString()).to.equal(book2._id.toString())
            })
    )

    it('throws an error if the book is not in the user\'s bookshelf', () =>
        logic.removeBookFromBookshelf(user._id.toString(), new mongoose.Types.ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Book not found in user bookshelf')
            })
    )

    it('throws an error if the user does not exist', () =>
        logic.removeBookFromBookshelf(new mongoose.Types.ObjectId().toString(), book1._id.toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('Book not found in user bookshelf')
            })
    )

    after(() => mongoose.disconnect())
})
