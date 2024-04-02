import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Form from './core/Form.mjs'
import Label from './core/Label.mjs'
import Input from './core/Input.mjs'

import SubmitButton from './library/SubmitButton.mjs'

class SendMessageForm extends Form {
    constructor(userId) {
        super()

        const textLabel = new Label
        textLabel.setText('Text')
        textLabel.setFor('text')

        const textInput = new Input
        textInput.setId('text')

        const sendButton = new SubmitButton
        sendButton.setType('submit')
        sendButton.setText('Send')

        this.onSubmit(event => {
            event.preventDefault()

            const text = textInput.getValue()

            try {
                logic.sendMessageToUser(userId, text)

                this.reset()

                this._onSendMessageCallback()
            } catch (error) {
                utils.showFeedback(error)
            }
        })

        this.add(textLabel, textInput, sendButton)

        this._onSendMessageCallback = null
    }

    onSendMessage(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._onSendMessageCallback = callback
    }
}

export default SendMessageForm