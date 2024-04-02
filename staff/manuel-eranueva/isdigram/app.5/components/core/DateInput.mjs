import Input from './Input.mjs'

class DateInput extends Input {
    constructor() {
        super()

        this.setType('date')
    }
}

export default DateInput