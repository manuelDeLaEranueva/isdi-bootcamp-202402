//@ts-nocheck
import dotenv from 'dotenv'
import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'
import { User, Book } from '../data/index.ts'

dotenv.config()

const { NotFoundError, SystemError } = errors

describe('retrieveBooks', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    let user

    beforeEach(() =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany()
        ])
            .then(() =>
                User.create({ name: 'Pepe Roni', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(createdUser => {
                        user = createdUser
                    })
            )
    )

    it('retrieves all books from user', () =>
        Promise.all([
            Book.create({ image: 'https://www.zonanegativa.com/imagenes/2012/10/tekkon-kinkreet.jpg', name: 'Tekonkinkreet', author: 'Matsumoto' }),
            Book.create({ image: 'https://m.media-amazon.com/images/I/71lV0Qc6ApL._AC_UF894,1000_QL80_.jpg', name: 'Hierba', author: 'Keum Suk Gendry-Kim' }),
            Book.create({ image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDzvc968j48yhNhxhlboT578obXky8DvpaATodIjItQ&s', name: 'Crisis Zone', author: 'Hanselmann' }),
        ])
            .then(([book1, book2, book3]) =>
                logic.retrieveBooks(user.id)
                    .then(books => {
                        expect(books).to.have.lengthOf(3)

                        const book1b = books.find(book => book.image === book1.image)
                        expect(book1b.name).to.equal(book1.name)
                        expect(book1b.author).to.equal(book1.author)

                        const book2b = books.find(book => book.image === book2.image)
                        expect(book2b.name).to.equal(book2.name)
                        expect(book2b.author).to.equal(book2.author)

                        const book3b = books.find(book => book.image === book3.image)
                        expect(book3b.name).to.equal(book3.name)
                        expect(book3b.author).to.equal(book3.author)
                    })
            )
    )

    it('retrieves no books if user has no books', () =>
        logic.retrieveBooks(user.id)
            .then(books => {
                expect(books).to.have.lengthOf(0)
            })
    )

    it('throws an error if user does not exist', () =>
        logic.retrieveBooks(new mongoose.Types.ObjectId().toString())
            .catch(error => {
                expect(error).to.be.instanceOf(NotFoundError)
                expect(error.message).to.equal('User not found')
            })
    )

    it('throws an error if userId is not a valid ObjectId', () =>
        logic.retrieveBooks('invalidUserId')
            .catch(error => {
                expect(error).to.be.instanceOf(SystemError)
                expect(error.message).to.include('Cast to ObjectId failed')
            })
    )

    after(() => mongoose.disconnect())
})
