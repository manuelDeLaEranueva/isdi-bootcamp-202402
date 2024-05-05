import { validate, errors } from 'com'
import { User, Card, Book } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function createCard(userId: string, bookId: string): Promise<void> {
    validate.text(userId, 'userId', true)
    validate.text(bookId, 'bookId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Book.findById(bookId)
                .then(book => {
                    if (!book)
                        throw new NotFoundError('book not found')

                    return Card.create({ book: book._id, owner: user._id.toString() })
                        .catch((error) => { throw new Error(error.message) })
                })
        })
        .then(card => { })
}

export default createCard