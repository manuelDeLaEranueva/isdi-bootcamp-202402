import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
import Card from './Card'
import { useContext } from '../context'

function CardList({ cards: initialCards, onDeleted }) {
    const [cards, setCards] = useState(initialCards)
    const { showFeedback } = useContext()

    useEffect(() => {
        logger.debug('CardList -> loadCards')

        try {
            logic.retrieveCards()
                .then(setCards)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const handleCardDelete = (deletedCardId) => {
        logic.removeCard(deletedCardId)
            .then(() => {
                const updatedCards = cards.filter(card => card.id !== deletedCardId)
                setCards(updatedCards)
                onDeleted(deletedCardId)
            })
            .catch(error => showFeedback(error, 'error'))
    }

    logger.debug('CardList -> render')

    return (
        <section>
            {cards.map(card => (
                <Card
                    key={card.id}
                    item={card}
                    onDeleted={() => handleCardDelete(card.id)}
                />
            ))}
        </section>
    )
}

export default CardList
