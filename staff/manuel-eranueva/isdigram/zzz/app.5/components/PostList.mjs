import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from './core/Component.mjs'
import Post from './Post.mjs'

class PostList extends Component {
    constructor() {
        super('section')

        this.refresh()

        // setInterval(() => {
        //     console.count('post-list interval')

        //     if (PostList.active) {
        //         console.count('post-list refresh')

        //         this.refresh()
        //     }
        // }, 5000)

        setInterval(() => PostList.active && this.refresh(), 5000)

        PostList.active = true
    }

    refresh() {
        try {
            const posts = logic.retrievePosts()

            this.removeAll()

            posts.forEach(post => {
                const post2 = new Post(post)

                post2.onEditClick(post => this._onEditPostClick(post))

                post2.onEdited(() => this.refresh())

                post2.onDeleted(() => this.refresh())

                this.add(post2)
            })
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    static active = false

    onEditPostClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onEditPostClick = callback
    }
}

export default PostList