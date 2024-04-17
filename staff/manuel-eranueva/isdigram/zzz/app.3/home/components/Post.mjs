import utils from '../../utils.mjs'

import logic from '../../logic.mjs'

import Image from '../../core/Image.mjs'
import Component from '../../core/Component.mjs'
import EditPost from './EditPost.mjs'

class Post extends Component {
    constructor(post) {
        super('article')

        const author = new Component('h3')
        author.setText(post.author.username)

        const picture = new Image
        picture.setSource(post.image)

        const paragraph = new Component('p')
        paragraph.setText(post.text)

        const dateTime = new Component('time')
        dateTime.setText(post.date)

        this.add(author, picture, paragraph, dateTime)

        if (post.author.id === logic.getLoggedInUserId()) {
            const deleteButton = new Component('button')
            deleteButton.setText('🗑️')

            deleteButton.onClick(() => {
                if (confirm('delete post?'))
                    try {
                        logic.removePost(post.id)

                        this._onDeletedCallback()
                    } catch (error) {
                        utils.showFeedback(error)
                    }
            })

            const editButton = new Component('button')
            editButton.setText('📝')

            editButton.onClick(() => {
                if (!EditPost.active) {
                    const editPost = new EditPost(post)

                    editPost.onCancelClick(() => this.remove(editPost))

                    editPost.onPostEdited(() => this._onEditedCallback())

                    this.add(editPost)
                }
            })

            this.add(deleteButton, editButton)
        }

        this._onDeletedCallback = null
        this._onEditedCallback = null
    }

    onDeleted(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onDeletedCallback = callback
    }

    onEdited(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onEditedCallback = callback
    }
}

export default Post