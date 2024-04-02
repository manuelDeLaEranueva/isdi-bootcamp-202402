import Component from '../components/core/Component.mjs'
import Link from '../components/core/Link.mjs'

class Landing extends Component {
    constructor() {
        super('main')

        const title = new Component('h1')
        title.setText('Landing')

        const loginLink = new Link
        loginLink.setText('Login')
        loginLink.setHref('')

        loginLink.onClick(event => {
            event.preventDefault()

            this._onLoginClickCallback()
        })

        const orSpan = new Component('span')
        orSpan.setText(' or ')

        const registerLink = new Link
        registerLink.setText('Register')
        registerLink.setHref('')

        registerLink.onClick(event => {
            event.preventDefault()

            this._onRegisterClickCallback()
        })

        this.add(title, loginLink, orSpan, registerLink)

        this._onLoginClickCallback = null
        this._onRegisterClickCallback = null
    }

    onLoginClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onLoginClickCallback = callback
    }

    onRegisterClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onRegisterClickCallback = callback
    }
}

export default Landing