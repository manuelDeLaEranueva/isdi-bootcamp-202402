import { validate, errors } from 'com'
import { User, Book, MyBookself } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function addToBookshelf(userId, bookId) {
    validate.text(userId, 'userId', true)
    validate.text(bookId, 'bookId', true)

    let userPromise = User.findById(userId).exec()
    let bookPromise = Book.findById(bookId).exec()

    return Promise.all([userPromise, bookPromise])
        .then(([user, book]) => {
            if (!user) throw new NotFoundError('User not found')
            if (!book) throw new NotFoundError('Book not found')

            return MyBookself.create({ owner: user._id, book: book._id })
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default addToBookshelf
