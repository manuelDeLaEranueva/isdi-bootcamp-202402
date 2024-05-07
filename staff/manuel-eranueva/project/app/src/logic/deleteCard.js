import { validate } from 'com'

function deleteCard(postId) {
    validate.text(postId, 'postId', true)

    // TODO
}

export default deleteCard