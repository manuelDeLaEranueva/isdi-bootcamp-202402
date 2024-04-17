import { validate, errors } from 'com'
import { User, Post } from '../data/index.ts'

const { SystemError, NotFoundError } = errors


function createPost(userId: string, image: string, text: string): Promise<void> {
    validate.text(userId, 'userId', true)
    validate.url(image, 'image')
    if (text)
        validate.text(text, 'text')

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.create({ author: user._id, image, text, date: new Date })
                .catch(error => { throw new SystemError(error.message) })
        })
        .then(post => { })
}

export default createPost