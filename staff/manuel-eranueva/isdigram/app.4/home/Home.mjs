import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../core/Component.mjs'
import Menu from './components/Menu.mjs'
import PostList from './components/PostList.mjs'
import Footer from './components/Footer.mjs'
import CreatePost from './components/CreatePost.mjs'
import Chat from './components/Chat.mjs'

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
            postList.stopAutoRefresh()

            this.remove(postList)
            this.remove(footer)

            this.add(chat)
        })

        menu.onHomeClick(() => {
            chat.stopAutoRefresh()

            this.remove(chat)

            this.add(postList)
            this.add(footer)
        })

        this.add(menu)

        const postList = new PostList

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
    }
}

export default Home