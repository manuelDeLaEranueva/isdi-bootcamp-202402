import { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { User, CardType, Card } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveCards(userId: string): Promise<CardType[]> { // Cambia el tipo de retorno a Promise<Card[]>
    validate.text(userId, 'userId', true);

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found');

            return Card.find({ owner: userId })
                .populate('book', 'image name author')
                .lean()
                .then(cards => cards.reverse())
        });
}
export default retrieveCards
