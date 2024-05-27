import { validate, errors } from 'com'
import { MyBookself } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function removeBookFromBookshelf(userId, bookId) {
    validate.text(userId, 'userId', true)
    validate.text(bookId, 'bookId', true)

    return MyBookself.findOneAndDelete({ owner: userId, book: bookId })
        .catch(error => { throw new SystemError(error.message) })
        .then(result => {
            if (!result) {
                throw new NotFoundError('Book not found in user bookshelf')
            }
        })
}

export default removeBookFromBookshelf