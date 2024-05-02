import { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { User, Card } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrieveCards(userId): Promise<[{ id: string; image: string; name: string; author: string; owner: { id: string; username: string; } }] | { id: string; image: string; name: string; author: string; owner: { id: string; username: string; } }[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Card.find().populate<{ owner: { _id: ObjectId, username: string } }>('owner', 'username').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(cards =>
                    cards.map<{ id: string; image: string; name: string; author: string; owner: { id: string; username: string; } }>(({ _id, image, name, author, owner }) => ({
                        id: _id.toString(),
                        image,
                        name,
                        author,
                        owner: {
                            id: owner._id.toString(),
                            username: owner.username
                        }
                    })).reverse()
                )
        })
}
export default retrieveCards
