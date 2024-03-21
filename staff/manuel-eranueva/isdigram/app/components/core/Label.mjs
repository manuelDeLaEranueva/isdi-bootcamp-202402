import Component from './Component.mjs'

class Label extends Component {
    constructor() {
        super('label')
    }

    setFor(forId) {
        if (typeof forId !== 'string') throw new TypeError('forId is not a string')

        this._container.for = forId
    }
}

export default Label