import { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { Book } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveBooks(): Promise<[{ image: string, name: string, author: string }]> {
    return Book.find().populate
        .catch(error => { throw new SystemError(error.message) })
        .then(books =>
            books.map<{ image: string, name: string, author: string }>

        )
}