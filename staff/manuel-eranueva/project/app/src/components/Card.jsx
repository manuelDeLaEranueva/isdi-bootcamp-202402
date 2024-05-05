import { logger } from '../utils'

import RoundButton from './library/RoundButton'

import logic from '../logic'

import { useContext } from '../context'

function CreateCard(props) {
    const { showFeedback } = useContext()

    const { handleSubmit } = event => {
        event.preventDefault()

        const form = event.target

        try {
            logic.CreateCard(book)
                .then(() => {
                    form.reset()

                    props.onCardCreated()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreatePost -> render')

    return <section className="mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]">
        <form onSubmit={handleSubmit} className="flex flex-col ">


            <RoundButton>Create</RoundButton>
        </form>

        <CancelButton onClick={handleCancelClick} />
    </section>
}

export default CreateCard