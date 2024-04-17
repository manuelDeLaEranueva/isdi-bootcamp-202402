import { logger, showFeedback } from '../utils'

import CancelButton from './library/CancelButton'

import logic from '../logic'
import SubmitButton from './library/SubmitButton'

// import './CreatePost.sass'

function CreatePost(props) {
    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const image = form.image.value
        const text = form.text.value

        try {
            logic.createPost(image, text)
                .then(() => {
                    form.reset()

                    props.onPostCreated()
                })
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreatePost -> render')

    return <section className="mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]">
        <form onSubmit={handleSubmit} className="flex flex-col ">
            <label>Image</label>
            <input id="image" type="text" />

            <label>Text</label>
            <input id="text" type="text" />

            <SubmitButton>Create</SubmitButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}

export default CreatePost