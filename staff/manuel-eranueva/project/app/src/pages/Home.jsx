import React, { useState, useEffect } from 'react'
import logic from '../logic'
import BookList from '../components/BookList'
import Popup from '../components/Popup'
import CardList from '../components/CardList'
import { Link } from 'react-router-dom'
import retrieveCards from '../logic/retrieveCards'
import { useContext } from '../context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [popupOpen, setPopupOpen] = useState(false)
    const [cards, setCards] = useState([])
    const [searchVisible, setSearchVisible] = useState(false)

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
        retrieveCards()
            .then(cards => {
                setCards(cards)
            })
            .catch(error => console.error('Error retrieving cards:', error))
    }, [])

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
        setSearchVisible(false)
        setPopupOpen(true)
    }

    const handleClosePopup = () => {
        setSelectedBook(null)
        setPopupOpen(false)
    }

    const handleCardCreated = () => {
        setPopupOpen(false)
        retrieveCards()
            .then(cards => {
                setCards(cards)
            })
            .catch(error => console.error('Error retrieving cards:', error))
    }

    const handleCardDelete = (deletedCardId) => {
        setCards(cards.filter(card => card._id !== deletedCardId))
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
                {popupOpen && selectedBook && (
                    <Popup book={selectedBook} onClose={handleClosePopup} onCardCreated={handleCardCreated} />
                )}
                <CardList cards={cards} onDeleted={handleCardDelete} />
            </main>
            <footer className="fixed bottom-0 w-full bg-white shadow-md p-4">
                <button onClick={() => setSearchVisible(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    ➕ Add Card
                </button>
            </footer>
            {searchVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <button onClick={() => setSearchVisible(false)} className="absolute top-4 right-4 text-2xl">&times;</button>
                        <BookList onBookSelect={handleSelectedBook} />
                        <button onClick={() => setSearchVisible(false)} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
        </>
    )
}

export default Home
