import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import Card from './Card'

import { useContext } from '../context'

function CardList({ stamp }) {
    const [cards, setCards] = useState([])

    const { showFeedback } = useContext()

    const loadCards = () => {
        logger.debug('PostList -> loadCards')

        try {
            logic.retrieveCards()
                .then(setCards)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadCards()
    }, [stamp])

    const handleCardDeleted = () => loadCards()

    logger.debug('CardList -> render')

    return <section>
        {cards.map(card => <Card key={card.id} item={card} onDeleted={handleCardDeleted} />)}
    </section>
}

export default CardList