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

async function retrieveCards(userId: string): Promise<CardResponse[]> {
    validate.text(userId, 'userId', true);

    const user = await User.findById(userId).catch(error => { throw new SystemError(error.message); });
    if (!user) {
        throw new NotFoundError('user not found');
    }

    const cards = await Card.find()
        .populate('book', '_id image name author')
        .populate('owner', '_id name email username')
        .lean<PopulatedCard[]>()
        .catch(error => { throw new SystemError(error.message); });

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
}

export default retrieveCards;
