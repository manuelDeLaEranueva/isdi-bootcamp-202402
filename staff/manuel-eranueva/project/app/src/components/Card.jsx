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
                        .then(() => onDeleted(cardId))
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

    const isLoggedInUser = logic.getLoggedInUserId() === owner.id

    return (
        <article className="card p-4 border rounded shadow-md relative">
            <h3 className="font-bold text-[#050CA6] mb-2">{owner.username}</h3>
            {book.image && <img src={book.image} alt={`Cover of ${book.name}`} className="w-full h-auto mb-2" />}
            <p className="text-lg font-semibold mb-2">{book.name}</p>
            <p className="text-gray-600 mb-2">{book.author}</p>
            {isLoggedInUser && (
                <button
                    onClick={() => handleDeleteClick(card.id)}
                    className="absolute bottom-12 right-2 hover:bg-black-600 text-white font-semibold py-1 px-2 rounded"
                >
                    <img src="../../public/bin.png" className="w-6" />
                </button>
            )}
            {!isLoggedInUser && (
                <a href={`mailto:${card.owner.email}?Subject=Intereseted%20in%20${book.name}`} title="Contact by mail" className="absolute bottom-12 right-2">
                    <img src="../../public/mail.png" className="w-6" />
                </a>
            )}
        </article >
    )
}

export default Card
