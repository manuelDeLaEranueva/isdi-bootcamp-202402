import RoundButton from './RoundButton'

import './SubmitButton.sass'

function SubmitButton(props) {
    return <RoundButton className="submit-button" type="submit">{props.children || 'Submit'}</RoundButton>
}

export default SubmitButton