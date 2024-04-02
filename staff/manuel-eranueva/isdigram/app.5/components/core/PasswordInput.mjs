import Input from './Input.mjs'

class PasswordInput extends Input {
    constructor() {
        super()

        this.setType('password')
    }
}

export default PasswordInput