import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../components/core/Component.mjs'
import Form from '../components/core/Form.mjs'
import Label from '../components/core/Label.mjs'
import Input from '../components/core/Input.mjs'
import PasswordInput from '../components/core/PasswordInput.mjs'
import Link from '../components/core/Link.mjs'

import RoundButton from '../components/library/RoundButton.mjs'

class Login extends Component {
    constructor() {
        super('main')

        const title = new Component('h1')
        title.setText('Login')

        const form = new Form

        const usernameLabel = new Label
        usernameLabel.setFor('username')
        usernameLabel.setText('Username')

        const usernameInput = new Input
        usernameInput.setId('username')

        const passwordLabel = new Label
        passwordLabel.setFor('password')
        passwordLabel.setText('Password')

        const passwordInput = new PasswordInput
        passwordInput.setId('password')

        const submitButton = new RoundButton
        submitButton.setText('Login')
        submitButton.setType('submit')

        form.onSubmit(event => {
            event.preventDefault()

            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.loginUser(username, password)

                form.reset()

                this._onUserLoggedInCallback()
            } catch (error) {
                utils.showFeedback(error)
            }

        })

        form.add(usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const registerLink = new Link
        registerLink.setText('Register')
        registerLink.setHref('')

        registerLink.onClick(event => {
            event.preventDefault()

            this._onRegisterClickCallback()
        })

        this.add(title, form, registerLink)

        this._onRegisterClickCallback = null
        this._onUserLoggedInCallback = null
    }

    onRegisterClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onRegisterClickCallback = callback
    }

    onUserLoggedIn(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onUserLoggedInCallback = callback
    }
}

export default Login