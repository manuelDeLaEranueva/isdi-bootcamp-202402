import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from '../core/Component.mjs'
import Form from '../core/Form.mjs'
import Label from '../core/Label.mjs'
import Input from '../core/Input.mjs'
import PasswordInput from '../core/PasswordInput.mjs'
import Link from '../core/Link.mjs'

import RoundButton from '../library/RoundButton.mjs'

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

                location.href = '../home'
            } catch (error) {
                utils.showFeedback(error)
            }

        })

        form.add(usernameLabel, usernameInput, passwordLabel, passwordInput, submitButton)

        const link = new Link
        link.setText('Register')
        link.setHref('../register')

        this.add(title, form, link)
    }
}

export default Login