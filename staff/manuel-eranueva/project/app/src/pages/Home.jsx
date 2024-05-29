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
        logic.retrieveCards()
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
        logic.retrieveCards()
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
            <main className="p-8 flex-grow">
                {popupOpen && selectedBook && (
                    <Popup book={selectedBook} onClose={handleClosePopup} onActionCompleted={handleCardCreated} context="addCard" />
                )}
                <CardList cards={cards} onDeleted={handleCardDelete} />
            </main>
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
            <footer className="fixed bottom-0 w-full bg-white shadow-md p-2 flex justify-around">
                <button onClick={() => setSearchVisible(true)} className="text-[#050CA6] font-bold py-1 px-2 rounded">
                    <img src="../../public/plus.png" className="w-9 h-9" />
                </button>

                <Link to="/profile" className="text-[#050CA6] font-bold py-1 px-2 rounded text-center">
                    <img src="../../public/profile.png" className="w-12 h-12" />
                </Link>
                
                <button onClick={handleLogoutClick} className="text-[#050CA6] font-bold py-1 px-2 rounded">
                    <img src="../../public/logout.png" className="w-9 h-9" />
                </button>
            </footer>
        </>
    )
}

export default Home