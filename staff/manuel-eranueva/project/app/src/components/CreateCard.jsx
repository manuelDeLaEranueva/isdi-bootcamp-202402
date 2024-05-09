import { logger } from '../utils'
import CancelButton from './library/CancelButton'
import React from 'react'
import RoundButton from './library/RoundButton'
import logic from '../logic'
import { useContext } from '../context'
import Card from './Card'


function CreateCard(props) {
    const { showFeedback } = useContext();

    const handleSubmit = event => {
        event.preventDefault()

        try {
            logic.createCard()
                .then(() => {
                    form.reset()

                    props.onCardCreated()
                })
                .catch(error => showFeedback(error, 'error'));
        } catch (error) {
            showFeedback(error);
        }
    }

    const handleCancelClick = () => props.onCancelClick()

    logger.debug('CreateCard -> render')

    return (
        <section className="mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]">
            <form onSubmit={handleSubmit} className="flex flex-col ">
                <RoundButton type="submit">Create</RoundButton>
            </form>

            <CancelButton onClick={handleCancelClick} />
        </section>
    )
}

export default CreateCard