import utils from '../utils.mjs'

import logic from '../logic.mjs'

import Component from './core/Component.mjs'

class MessageList extends Component {
    constructor(userId) {
        super('ul')

        this._userId = userId

        this.addClass('message-list')

        this.refresh()

        this._refreshIntervalId = setInterval(() => {
            console.count('message-list interval')

            if (MessageList.active) {
                console.count('message-list refresh')

                this.refresh()
            }
        }, 1000)

        // this._refreshIntervalId = setInterval(() => MessageList.active && this.refresh(), 1000)

        MessageList.active = true
    }

    refresh() {
        this.removeAll()

        try {
            const messages = logic.retrieveMessagesWithUser(this._userId)

            messages.forEach(message => {
                const messageItem = new Component('li')
                messageItem.setText(message.text)

                if (message.from === logic.getLoggedInUserId())
                    messageItem.addClass('message-list__item--right')
                else
                    messageItem.addClass('message-list__item--left')

                this.add(messageItem)
            })
        } catch (error) {
            utils.showFeedback(error)
        }
    }

    static active = false

    stopAutoRefresh() {
        clearInterval(this._refreshIntervalId)
    }
}

export default MessageList