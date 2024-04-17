import { validate, errors } from 'com'

function modifyPost(postId, text) {
    validate.text(postId, 'postId', true)
    validate.text(text, 'text')

    const post = db.posts.findOne(post => post.id === postId)

    if (!post) throw new Error('post not found')

    if (post.author !== sessionStorage.userId) throw new Error('post does not belong to user')

    post.text = text

    db.posts.updateOne(post)
}

export default modifyPost