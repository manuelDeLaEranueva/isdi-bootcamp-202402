import { logger } from '../utils'

import { Link } from 'react-router-dom'

import logic from '../logic'

import { useContext } from '../context'

function Card({ item: card, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = cardId =>
        showConfirm('delete card?', confirmed => {
            if (confirmed)
                try {
                    logic.deleteCard(cardId)
                        .then(() => onDeleted())
                        .catch(error => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
        })

    logger.debug('Card > render')

    return <article>

        {logic.getLoggedInUserId() === card.owner.id && <>
            <button onClick={() => handleDeleteClick(card.id)}>🗑️</button>
        </>}
    </article>
}

export default Card