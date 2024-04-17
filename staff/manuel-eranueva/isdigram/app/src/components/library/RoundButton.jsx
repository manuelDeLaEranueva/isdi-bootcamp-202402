import './RoundButton.sass'

function RoundButton(props) {
    return <button className={`round-button ${props.className}`} type={props.type} onClick={props.onClick}>{props.children || 'Button'}</button>
}

export default RoundButton