import RoundButton from './RoundButton.mjs'

class SubmitButton extends RoundButton {
    constructor() {
        super()

        this.addClass('submit-button')
        this.setType('submit')
    }
}

export default SubmitButton