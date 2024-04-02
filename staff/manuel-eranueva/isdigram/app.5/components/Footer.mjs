import Component from './core/Component.mjs'
import Button from './core/Button.mjs'

class Footer extends Component {
    constructor() {
        super('footer')

        this.addClass('footer')

        const createPostButton = new Button
        createPostButton.setText('➕')

        this.add(createPostButton)

        this._createPostButton = createPostButton
    }

    onCreatePostClick(callback) {
        this._createPostButton.onClick(callback)
    }
}

export default Footer