import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logic from '../logic'
import { useContext } from '../context'
import UserBookList from '../components/UserBookList'
import BookList from '../components/BookList'
import Popup from '../components/Popup'

function Profile() {
    const { showFeedback } = useContext()
    const [user, setUser] = useState(null)
    const [bookselves, setBookselves] = useState([])
    const [selectedBook, setSelectedBook] = useState(null)
    const [popupOpen, setPopupOpen] = useState(false)
    const [searchVisible, setSearchVisible] = useState(false)
    const [editMode, setEditMode] = useState(false)

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await logic.retrieveUser()
                setUser(userData)

                const bookselves = await logic.retrieveUserBooks()
                setBookselves(bookselves)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    const handleSelectedBook = (book) => {
        setSelectedBook(book)
        setSearchVisible(false)
        setPopupOpen(true)
    }

    const handleClosePopup = () => {
        setSelectedBook(null)
        setPopupOpen(false)
    }

    const handleBookAdded = () => {
        setPopupOpen(false)
        logic.retrieveUserBooks()
            .then(setBookselves)
            .catch(error => console.error('Error retrieving bookshelves:', error))
    }

    const handleDeleteBook = (bookId) => {
        logic.removeBookFromBookshelf(bookId)
            .then(() => {
                setBookselves(prevBookselves => prevBookselves.filter(book => book.book.id !== bookId))
            })
            .catch(error => console.error('Error deleting book from bookshelf:', error))
    }
    console.log(bookselves)
    return (
        <section className="min-h-screen flex flex-col justify-start bg-white">
            <header className="fixed top-0 w-full bg-white shadow-md p-2 z-50">
                <div className="max-w-screen-lg mx-auto flex justify-between items-center px-4">
                    <Link to="/">
                        <img src="../../public/logo.png" alt="home" className="w-12 h-12" />
                    </Link>
                    <div className="mt-2 flex flex-col items-center">
                        {user && (
                            <h1 className="text-[#000568] font-bold text-xl mt-2">
                                {user.username}'s bookself
                            </h1>
                        )}
                    </div>
                </div>
            </header>

            <main className="flex-grow pt-20 pb-16 px-4">
                <UserBookList bookselves={bookselves} editMode={editMode} onDeleteBook={handleDeleteBook} />
            </main>

            <footer className="fixed bottom-0 w-full bg-white shadow-md p-2 z-50 flex justify-around outline outline-2 outline-[#000568]">
                <button onClick={() => setSearchVisible(true)} className="text-[#050CA6] font-bold py-1 px-2 rounded">
                    <img src="../../public/plus.png" className="w-9 h-9" />
                </button>
                <button onClick={() => setEditMode(!editMode)} className="text-[#050CA6] font-bold py-1 px-2 rounded">
                    <img src="../../public/edit.png" className="w-9 h-9" />
                </button>
            </footer>

            {searchVisible && (
                <div className="fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white p-8 rounded-lg shadow-lg relative">
                        <BookList onBookSelect={handleSelectedBook} />
                        <button onClick={() => setSearchVisible(false)} className="mt-4 bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                            Cancel
                        </button>
                    </div>
                </div>
            )}
            {popupOpen && selectedBook && (
                <Popup book={selectedBook} onClose={handleClosePopup} onActionCompleted={handleBookAdded} context="addToBookshelf" />
            )}
        </section>
    )
}

export default Profile
