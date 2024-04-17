import RoundButton from './RoundButton'

import './CancelButton.sass'

function CancelButton(props) {
    return <RoundButton className="cancel-button" onClick={props.onClick}>{props.children || 'Cancel'}</RoundButton>
}

export default CancelButton