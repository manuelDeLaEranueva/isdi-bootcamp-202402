import Component from './Component.mjs'

class Input extends Component {
    constructor() {
        super('input')
    }

    setType(type) {
        if (typeof type !== 'string') throw new TypeError('type is not a string')

        this._container.type = type
    }

    getValue() {
        return this._container.value
    }

    setValue(value) {
        this._container.value = value
    }
}

export default Input