import Input from './Input.mjs'

class EmailInput extends Input {
    constructor() {
        super()

        this.setType('email')
    }
}

export default EmailInput