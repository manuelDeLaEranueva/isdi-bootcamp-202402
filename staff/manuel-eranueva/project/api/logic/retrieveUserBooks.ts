import { ObjectId } from 'mongoose'
import { Book, MyBookself, User } from '../data/index.ts'
import { Schema } from 'mongoose'
import { validate, errors } from 'com'

const { SystemError, NotFoundError } = errors

type BookResponse = {
    id: string;
    author: string;
    name: string;
    image: string;
}

type OwnerResponse = {
    id: string;
    name: string;
    email: string;
    username: string;
}

type MyBookselfResponse = {
    id: string;
    book: BookResponse;
    owner: OwnerResponse;
}

type PopulatedBook = {
    _id: ObjectId;
    author: string;
    name: string;
    image: string;
}

type PopulatedOwner = {
    _id: ObjectId;
    name: string;
    email: string;
    username: string;
}

type PopulatedMyBookself = {
    _id: ObjectId;
    book: PopulatedBook;
    owner: PopulatedOwner;
}

function retrieveUserBooks(userId: string): Promise<MyBookselfResponse[]> {
    validate.text(userId, 'userId', true);

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }
            return MyBookself.find({ owner: userId })
                .populate('book', '_id image name author')
                .populate('owner', '_id name email username')
                .lean<PopulatedMyBookself[]>();
        })
        .then((bookselves: PopulatedMyBookself[]) => {
            return bookselves.map(bookself => ({
                id: bookself._id.toString(),
                book: {
                    id: bookself.book._id.toString(),
                    author: bookself.book.author,
                    image: bookself.book.image,
                    name: bookself.book.name
                },
                owner: {
                    id: bookself.owner._id.toString(),
                    name: bookself.owner.name,
                    email: bookself.owner.email,
                    username: bookself.owner.username
                }
            })).reverse();
        })
        .catch(error => {
            return Promise.reject(new SystemError(error.message))
        })
}

export default retrieveUserBooks
