import { validate, errors } from 'com'
import { Card, User } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function removeCard(userId, cardId) {
    console.log(`removeCard called with userId: ${userId} and cardId: ${cardId}`) // <-- Agrega esta línea
    validate.text(userId, 'userId', true)
    validate.text(cardId, 'cardId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user) {
                console.log('User not found') // <-- Agrega esta línea
                throw new NotFoundError('user does not exist')
            }

            return Card.findById(cardId)
                .catch(error => { throw new SystemError(error.message) })
                .then(card => {
                    if (!card) {
                        console.log('Card not found') // <-- Agrega esta línea
                        throw new NotFoundError('card not found')
                    }

                    if (card.owner.toString() !== user._id.toString()) {
                        console.log('Card does not belong to user') // <-- Agrega esta línea
                        throw new NotFoundError('card does not belong to user')
                    }

                    console.log('Card found and belongs to user, deleting...') // <-- Agrega esta línea
                    return Card.findByIdAndDelete(cardId)
                        .catch(error => { throw new SystemError(error.message) })
                })
        })
}

export default removeCard
