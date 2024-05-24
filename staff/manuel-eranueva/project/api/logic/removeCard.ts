import { validate, errors } from 'com'
import { Card, User } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function removeCard(userId, cardId) {
    validate.text(userId, 'userId', true)
    validate.text(cardId, 'cardId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user does not exist')

            return Card.findById(cardId)
                .catch(error => { throw new SystemError(error.message) })
                .then(card => {
                    if (!card)
                        throw new NotFoundError('card not found')

                    if (card.owner.toString() !== user._id.toString())
                        throw new NotFoundError('card does not belong to user')

                    return Card.findByIdAndDelete(cardId)
                })
        })
}

export default removeCard
