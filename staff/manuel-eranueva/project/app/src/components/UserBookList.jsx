import { logger } from '../utils'
import logic from '../logic'
import { useState, useEffect } from 'react'
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

    return (
        <section className="bg-white p-4 rounded shadow-md mt-4">
            {bookselves.length > 0 ? (
                bookselves.map(card => (
                    <UserBook key={card.id} item={card} onDeleted={handleCardDeleted} />
                ))
            ) : (
                <p className="text-gray-500">No books available</p>
            )}
        </section>
    )
}

export default UserBookList
