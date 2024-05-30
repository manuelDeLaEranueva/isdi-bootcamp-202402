import { validate, errors } from 'com';
import { User, Book } from '../data/index.ts';

const { SystemError, NotFoundError } = errors;

type BookResponse = {
    id: string;
    image: string;
    name: string;
    author: string;
}

function retrieveBooks(userId: string): Promise<BookResponse[]> {
    validate.text(userId, 'userId', true);

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('User not found');
            }
            return Book.find().lean();
        })
        .then(books => {
            return books.map(book => ({
                id: book._id.toString(),
                image: book.image,
                name: book.name,
                author: book.author
            }));
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                return Promise.reject(error);
            }
            return Promise.reject(new SystemError(error.message));
        });
}

export default retrieveBooks;
