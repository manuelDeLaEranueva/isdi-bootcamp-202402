import { validate, errors } from 'com'
import { User, Card, Book } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function createCard(userId: string, bookId: string): Promise<void> {
    // validate.text(userId, 'userId', true)
    // validate.text(bookId, 'bookId', true)

    let userPromise = User.findById(userId).exec()
    let bookPromise = Book.findById(bookId).exec()

    return Promise.all([userPromise, bookPromise])
        .then(([user, book]) => {
            if (!user)
                throw new NotFoundError('User not found')

            if (!book)
                throw new NotFoundError('Book not found')

            const card = {
                owner: user._id,
                book: book._id
            }

            return Card.create(card)
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(card => { })
}

export default createCard
