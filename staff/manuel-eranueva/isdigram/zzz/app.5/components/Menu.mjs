import logic from '../logic.mjs'

import Component from './core/Component.mjs'
import Button from './core/Button.mjs'

class Menu extends Component {
    constructor() {
        super('nav')

        const homeButton = new Button
        homeButton.setText('🏠')

        homeButton.onClick(() => {
            this.replace(homeButton, chatButton)

            this._onHomeClickCallback()
        })

        const chatButton = new Button
        chatButton.setText('💬')

        chatButton.onClick(() => {
            this.replace(chatButton, homeButton)

            this._onChatClickCallback()
        })

        const exitButton = new Button
        exitButton.setText('🚪')

        exitButton.onClick(() => {
            logic.logoutUser()

            this._onLogoutCallback()
        })

        this.add(chatButton, exitButton)

        this._onHomeClickCallback = null
        this._onChatClickCallback = null
        this._onLogoutCallback = null
    }

    onChatClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onChatClickCallback = callback
    }

    onHomeClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onHomeClickCallback = callback
    }

    onLogoutClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onLogoutCallback = callback
    }
}

export default Menu