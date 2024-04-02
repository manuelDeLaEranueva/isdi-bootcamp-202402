import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../components/core/Component.mjs'
import Form from '../components/core/Form.mjs'
import Label from '../components/core/Label.mjs'
import Input from '../components/core/Input.mjs'
import DateInput from '../components/core/DateInput.mjs'
import EmailInput from '../components/core/EmailInput.mjs'
import PasswordInput from '../components/core/PasswordInput.mjs'
import Link from '../components/core/Link.mjs'

import RoundButton from '../components/library/RoundButton.mjs'

class Register extends Component {
    constructor() {
        super('main')

        const title = new Component('h1')
        title.setText('Register')

        const form = new Form

        const nameLabel = new Label
        nameLabel.setFor('name')
        nameLabel.setText('Name')

        const nameInput = new Input
        nameInput.setId('name')

        const birthdateLabel = new Label
        birthdateLabel.setFor('birthdate')
        birthdateLabel.setText('Birthdate')

        const birthdateInput = new DateInput
        birthdateInput.setId('birthdate')

        const emailLabel = new Label
        emailLabel.setFor('email')
        emailLabel.setText('E-mail')

        const emailInput = new EmailInput
        emailInput.setId('email')

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
        submitButton.setText('Register')
        submitButton.setType('submit')

        form.onSubmit(event => {
            event.preventDefault()

            const name = nameInput.getValue()
            const birthdate = birthdateInput.getValue()
            const email = emailInput.getValue()
            const username = usernameInput.getValue()
            const password = passwordInput.getValue()

            try {
                logic.registerUser(name, birthdate, email, username, password)

                form.reset()

                this._onUserRegisteredCallback()
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        form.add(nameLabel, nameInput, birthdateLabel, birthdateInput, emailLabel, emailInput, usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const loginLink = new Link
        loginLink.setText('Login')
        loginLink.setHref('')

        loginLink.onClick(event => {
            event.preventDefault()

            this._onLoginClickCallback()
        })

        this.add(title, form, loginLink)

        this._onLoginClickCallback = null
        this._onUserRegisteredCallback = null
    }

    onLoginClick(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onLoginClickCallback = callback
    }

    onUserRegistered(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onUserRegisteredCallback = callback
    }
}

export default Register