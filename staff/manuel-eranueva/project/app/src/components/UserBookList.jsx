import { logger } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import Card from './Card'

import { useContext } from '../context'
import UserBook from './UserBook'

function UserBookList({ stamp }) {
    const [bookselves, setBookselves] = useState([])

    const { showFeedback } = useContext()

    const loadBookSelves = () => {
        logger.debug('PostList -> loadBookSelves')

        try {
            logic.retrieveUserBooks()
                .then(setBookselves)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    useEffect(() => {
        loadBookSelves()
    }, [stamp])

    const handleCardDeleted = () => loadBookSelves()

    logger.debug('UserBookList -> render')

    return <section>
        {bookselves.map(card => <UserBook key={card.id} item={card} onDeleted={handleCardDeleted} />)}
    </section>
}

export default UserBookList