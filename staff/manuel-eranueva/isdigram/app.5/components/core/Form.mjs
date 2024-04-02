import Component from './Component.mjs'

class Form extends Component {
    constructor() {
        super('form')
    }

    onSubmit(callback) {
        if (typeof callback !== 'function') throw new TypeError('callback is not a function')

        this._container.onsubmit = callback
    }

    reset() {
        this._container.reset()
    }
}

export default Form