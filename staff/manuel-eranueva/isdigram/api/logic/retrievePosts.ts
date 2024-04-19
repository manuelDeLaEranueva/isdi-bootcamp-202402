import { ObjectId } from 'mongoose'

import { validate, errors } from 'com'

import { User, Post } from '../data/index.ts'

const { SystemError, NotFoundError } = errors

function retrievePosts(userId): Promise<[{ id: string, author: { id: string, username: string }, image: string, text: string, date: Date }] | { id: string; author: { id: string; username: string; }; image: string; text: string; date: Date; }[]> {
    validate.text(userId, 'userId', true)

    return User.findById(userId)
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            return Post.find().populate<{ author: { _id: ObjectId, username: string } }>('author', 'username').lean()
                .catch(error => { throw new SystemError(error.message) })
                .then(posts =>
                    posts.map<{ id: string, author: { id: string, username: string }, image: string, text: string, date: Date }>(({ _id, author, image, text, date }) => ({
                        id: _id.toString(),
                        author: {
                            id: author._id.toString(),
                            username: author.username
                        },
                        image,
                        text,
                        date
                    })).reverse()
                )

        })

}

export default retrievePosts