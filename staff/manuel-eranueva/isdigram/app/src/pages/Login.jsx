import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Component } from 'react'

class Login extends Component {
    constructor() {
        logger.debug('Login')

        super()
    }

    handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)

            form.reset()

            this.props.onUserLoggedIn()
        } catch (error) {
            showFeedback(error)
        }
    }

    handleRegisterClick = event => {
        event.preventDefault()

        this.props.onRegisterClick()
    }

    render() {
        logger.debug('Login -> render')

        return <main>
            <h1>Login</h1>

            <form onSubmit={this.handleSubmit}>
                <label htmlFor="username">Username</label>
                <input id="username" />

                <label htmlFor="password">Password</label>
                <input type="password" id="password" />

                <button className="round-button" type="submit">Login</button>
            </form>

            <a href="" onClick={this.handleRegisterClick}>Register</a>
        </main>
    }
}

export default Login