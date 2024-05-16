import { Book, BookType, MyBookself, MyBookselfType, User } from '../data/index.ts'
import { Schema } from 'mongoose'

const { Types: { ObjectId } } = Schema

import { validate, errors } from 'com'

const { SystemError } = errors

function retrieveUserBooks(userId: string): Promise<MyBookselfType[]> {
    return MyBookself.find({ owner: userId })
        .populate('book')
        .populate('owner')
        .exec()
        .catch(error => { throw new SystemError(error.message) })
}

export default retrieveUserBooks
