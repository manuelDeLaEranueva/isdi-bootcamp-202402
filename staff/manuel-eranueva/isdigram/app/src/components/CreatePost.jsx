import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { Component } from 'react'

class CreatePost extends Component {
    constructor() {
        logger.debug('CreatePost')

        super()
    }

    componentDidMount() {
        logger.debug('CreatePost -> componentDidMount')
    }

    componentWillUnmount() {
        logger.debug('CreatePost -> componentWillUnmount')
    }

    handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)

            form.reset()

            this.props.onPostCreated()
        } catch (error) {
            showFeedback(error)
        }
    }

    handleCancelClick = () => this.props.onCancelClick()

    render() {
        logger.debug('CreatePost -> render')

        return <section className="create-post">
            <form onSubmit={this.handleSubmit}>
                <label>Image</label>
                <input id="image" type="text" />

                <label>Text</label>
                <input id="text" type="text" />

                <button className="round-button submit-button" type="submit">Create</button>
            </form>

            <button className="round-button cancel-button" onClick={this.handleCancelClick}>Cancel</button>
        </section>
    }
}

export default CreatePost