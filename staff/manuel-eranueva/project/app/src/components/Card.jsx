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


    if (!card) {
        console.log('no cards')
        return null;
    }

    return (
        <article>
            <h3>{card.owner && card.owner.username}</h3>
            <img src={card.image} />
            <p>{card.book && card.book.author && card.book.name}</p>
            {
                logic.getLoggedInUserId() === card.owner.id && (
                    <button onClick={() => handleDeleteClick(card.id)}>🗑️</button>
                )
            }
        </article>
    );
}

export default Card
