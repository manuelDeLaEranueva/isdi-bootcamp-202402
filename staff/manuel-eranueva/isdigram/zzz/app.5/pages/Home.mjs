import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../components/core/Component.mjs'
import Menu from '../components/Menu.mjs'
import PostList from '../components/PostList.mjs'
import Footer from '../components/Footer.mjs'
import CreatePost from '../components/CreatePost.mjs'
import Chat from '../components/Chat.mjs'
import EditPost from '../components/EditPost.mjs'

class Home extends Component {
    constructor() {
        super('main')

        this.addClass('main')

        try {
            const user = logic.retrieveUser()

            const title = new Component('h1')
            title.setText('Hello, ' + user.name + '!')

            this.add(title)
        } catch (error) {
            utils.showFeedback(error)
        }

        const menu = new Menu

        const chat = new Chat

        menu.onChatClick(() => {
            PostList.active = false

            this.remove(postList)
            this.remove(footer)

            Chat.active = true

            this.add(chat)
        })

        menu.onHomeClick(() => {
            Chat.active = false

            this.remove(chat)

            PostList.active = true

            this.add(postList)
            this.add(footer)
        })

        menu.onLogoutClick(() => {
            PostList.active = false
            Chat.active = false

            this._onLogoutCallback()
        })

        this.add(menu)

        const postList = new PostList

        postList.onEditPostClick(post => {
            if (!EditPost.active) {
                const editPost = new EditPost(post)

                editPost.onCancelClick(() => this.remove(editPost))

                editPost.onPostEdited(() => {
                    this.remove(editPost)

                    postList.refresh()
                })

                this.add(editPost)
            }
        })

        this.add(postList)

        const footer = new Footer

        footer.onCreatePostClick(() => {
            if (!CreatePost.active) {
                const createPost = new CreatePost

                createPost.onCancelClick(() => this.remove(createPost))

                createPost.onPostCreated(() => {
                    this.remove(createPost)

                    postList.refresh()
                })

                this.add(createPost)
            }
        })

        this.add(footer)

        this._onLogoutCallback = null
    }

    onLogout(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onLogoutCallback = callback
    }
}

export default Home 