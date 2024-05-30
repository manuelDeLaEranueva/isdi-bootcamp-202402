import { ObjectId } from 'mongoose';
import { Card, User } from '../data/index.ts';
import { errors, validate } from 'com';

const { SystemError, NotFoundError } = errors;

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

type CardResponse = {
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

type PopulatedCard = {
    _id: ObjectId;
    book: PopulatedBook;
    owner: PopulatedOwner;
}

function retrieveCards(userId: string): Promise<CardResponse[]> {
    validate.text(userId, 'userId', true);

    return User.findById(userId)
        .then(user => {
            if (!user) {
                throw new NotFoundError('user not found');
            }
            return Card.find()
                .populate('book', '_id image name author')
                .populate('owner', '_id name email username')
                .lean<PopulatedCard[]>();
        })
        .then((cards: PopulatedCard[]) => {
            return cards.map(card => ({
                id: card._id.toString(),
                book: {
                    id: card.book._id.toString(),
                    author: card.book.author,
                    image: card.book.image,
                    name: card.book.name
                },
                owner: {
                    id: card.owner._id.toString(),
                    name: card.owner.name,
                    email: card.owner.email,
                    username: card.owner.username
                }
            })).reverse();
        })
        .catch(error => {
            if (error instanceof NotFoundError) {
                return Promise.reject(error);
            }
            return Promise.reject(new SystemError(error.message));
        });
}

export default retrieveCards;
