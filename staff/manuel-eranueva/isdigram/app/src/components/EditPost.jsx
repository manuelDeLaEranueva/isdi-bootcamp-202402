import { logger } from '../utils'

import CancelButton from './library/CancelButton'

import logic from '../logic'
import SubmitButton from './library/SubmitButton'

import './EditPost.sass'

import { useContext } from '../context'

function EditPost(props) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const text = form.text.value

        logger.debug('EditPost -> handleSubmit', text)

        try {
            logic.modifyPost(props.post.id, text)
                .then(() => {
                    form.reset()

                    props.onPostEdited()
                })
                .catch(error => showFeedback(error.message), 'error')
        } catch (error) {
            showFeedback(error.message)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('EditPost -> render')

    return <section className="edit-post">
        <form onSubmit={handleSubmit}>
            <label>Text</label>
            <input id="text" type="text" defaultValue={props.post.text} />

            <SubmitButton>Save</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}

export default EditPost