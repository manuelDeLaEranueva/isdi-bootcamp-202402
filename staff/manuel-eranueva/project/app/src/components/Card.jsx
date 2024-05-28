import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'

function Card({ item: card, onDeleted }) {
    const { showFeedback, showConfirm } = useContext()

    const handleDeleteClick = (cardId) =>
        showConfirm('delete card?', (confirmed) => {
            if (confirmed)
                try {
                    logic.removeCard(cardId)
                        .then(() => onDeleted())
                        .catch((error) => showFeedback(error, 'error'))
                } catch (error) {
                    showFeedback(error)
                }
        })

    logger.debug('Card > render')

    if (!card) {
        console.log('no cards')
        return null
    }

    const { owner, book } = card

    if (!owner || !book) {
        console.log('Card data missing owner or book details')
        return null
    }

    return (
        <article className="card p-4 border rounded shadow-md">
            <h3 className="font-bold">{owner.username}</h3>
            {book.image && <img src={book.image} alt={`Cover of ${book.name}`} className="w-full h-auto" />}
            <p className="text-lg font-semibold">{book.name}</p>
            <p className="text-gray-600">{book.author}</p>
            {logic.getLoggedInUserId() === owner._id && (
                <button
                    onClick={() => handleDeleteClick(card._id)}
                    className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded mt-2"
                >
                    🗑️
                </button>
            )}
        </article>
    )
}

export default Card