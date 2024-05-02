import { validate, errors } from 'com'
import { User, Card } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function createCard(userId: string, image: string, name: string, author: string): Promise<void> {
    validate.url(image, 'image')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Card.create({ image, name, author, owner: user._id })
                .catch((error) => { throw new Error(error.message) })

        })
        .then(card => { })
}

export default createCard
