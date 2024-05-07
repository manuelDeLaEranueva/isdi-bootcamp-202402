import React, { useState, useEffect } from 'react'
import logic from '../logic'
import BookList from '../components/BookList'
import Popup from '../components/Popup'
import CreateCard from '../components/CreateCard'
import CardList from '../components/CardList'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])
    const [selectedBook, setSelectedBook] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false)
    const [card, setCard] = useState(null)

    useEffect(() => {
        logic.retrieveUser()
            .then(user => setUser(user))
            .catch(error => console.error('Failed to retrieve user:', error))


        logic.retrieveBooks()
            .then(books => setBooks(books))
            .catch(error => console.error('Failed to retrieve books:', error))
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
        setPopupOpen(true)
    }

    const handleClosePopup = () => {
        setSelectedBook(null)
        setPopupOpen(false)
    }
    const handleCreateCard = (book) => {

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
            <header>
                {user && <h1>{user.name}'s Bookshelf</h1>}
                <nav>
                    <button onClick={handleLogoutClick}>🚪 Logout</button>
                </nav>
            </header>
            <main>
                <BookList onBookSelect={handleSelectedBook} books={books} />
                {popupOpen && selectedBook && <Popup book={selectedBook} onClose={handleClosePopup} onCreateCard={handleCreateCard} />}
            </main>
        </>
    )
}

export default Home
