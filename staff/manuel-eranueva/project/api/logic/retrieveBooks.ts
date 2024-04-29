

import { validate, errors } from 'com'

import { User, Book } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBooks(userId): Promise<[{ image: String, name: String, author: String }] | { image: String, name: String, author: String }[]> {

    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) throw new NotFoundError('user not found')

            return Book.find().lean().exec()
                .catch(error => { throw new SystemError(error.message) })
        })
}

export default retrieveBooks