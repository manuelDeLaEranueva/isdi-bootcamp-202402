import Component from './Component.mjs'

class Link extends Component {
    constructor() {
        super('a')
    }

    setHref(href) {
        if (typeof href !== 'string') throw new TypeError('href is not a string')

        this._container.href = href
    }
}

export default Link