import React, { useState, useEffect } from 'react'
import logic from '../logic'
import BookList from '../components/BookList'
import Popup from '../components/Popup'
import CreateCard from '../components/CreateCard'
import CardList from '../components/CardList'
import { Link } from 'react-router-dom'
import retrieveCards from '../logic/retrieveCards'
import { useContext } from '../context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false)

    const [cards, setCards] = useState([]) // Nuevo estado para almacenar las cards

    const { showFeedback } = useContext()

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    useEffect(() => {
        try {
            logic.retrieveBooks()
                .then(setBooks)
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    useEffect(() => {
        retrieveCards() // Llama a la función retrieveCards
            .then(cards => setCards(cards))
            .catch(error => console.error('Error retrieving cards:', error))
    }, []) // Ejecuta una vez al montar el componente

    const clearView = () => setView(null)
    const handleCreateCardCancelClick = () => clearView()

    const handleCardCreated = () => {
        clearView()
    }

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
            onUserLoggedOut()
        } catch (error) {
            console.error('Logout failed:', error)
            logic.cleanUpLoggedInUserId()
        }
    }

    const handleSelectedBook = (book) => {
        setSelectedBook(book)
        setPopupOpen(true)
    }

    const handleClosePopup = () => {
        setSelectedBook(null)
        setPopupOpen(false)
    }

    const handleCreateCardClick = (book) => {
        logic.createCard(book._id, user._id)
            .then(() => {
                console.log('Card created successfully')
            })
            .catch(error => {
                console.error('Failed to create card:', error)
            })
    }

    return (
        <>
            <header className="py-4 px-8 bg-gray-800 text-white flex justify-between items-center">
                {user && <h1 className="text-3xl font-bold">{user.name}'s Bookshelf</h1>}
                <nav>
                    <button onClick={handleLogoutClick} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded">
                        🚪 Logout
                    </button>
                    <Link to="/profile">Go to Profile</Link>
                </nav>
            </header>
            <main className="p-8">
                {view === 'create-card' && <CreateCard onCancelClick={handleCreateCardCancelClick} onCardCreated={handleCardCreated} />}
                <BookList onBookSelect={handleSelectedBook} books={books} />
                {popupOpen && selectedBook && <Popup book={selectedBook} onClose={handleClosePopup} onCreateCard={handleCreateCardClick} />}
                <CardList cards={cards} /> {/* Renderiza la lista de cards */}
            </main>

            <footer className="fixed bottom-0 w-full bg-white shadow-md p-4">
                <button onClick={() => setView('create-card')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    ➕ Add Card
                </button>
            </footer>
        </>
    )
}

export default Home