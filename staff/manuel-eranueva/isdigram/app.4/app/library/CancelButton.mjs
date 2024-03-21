import RoundButton from './RoundButton.mjs'

class CancelButton extends RoundButton {
    constructor() {
        super()

        this.addClass('cancel-button')
    }
}

export default CancelButton