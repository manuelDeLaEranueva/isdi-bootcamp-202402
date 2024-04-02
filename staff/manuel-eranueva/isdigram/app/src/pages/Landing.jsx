import { logger } from '../utils'

import { Component } from 'react'

class Landing extends Component {
    constructor() {
        logger.debug('Landing')

        super()
    }

    handleLoginClick = event => {
        event.preventDefault()

        this.props.onLoginClick()
    }

    handleRegisterClick = event => {
        event.preventDefault()

        this.props.onRegisterClick()
    }

    render() {
        logger.debug('Landing -> render')

        return <main>
            <h1>Landing</h1>

            <a href="" onClick={this.handleLoginClick}>Login</a> or <a href="" onClick={this.handleRegisterClick}>Register</a>
        </main>
    }
}

export default Landing