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

    return (
        <section className="h-full bg-[#6E8BB3] flex flex-col justify-start mt-4 mx-4">
            <div className="sticky top-[80px] z-20 flex justify-between items-start bg-[#6E8BB3] p-4">
                <Link to="/">
                    <img src="../../home.png" alt="home" className="w-8 h-8" />
                </Link>

                <div className="mt-2 flex flex-col items-center">
                    {user && (
                        <h1 className="text-white font-bold text-xl mt-2">
                            Hola, {user.username}
                        </h1>
                    )}
                </div>
            </div>

            <section>
                <UserBookList />
            </section>

            <footer className="fixed bottom-0 w-full bg-white shadow-md p-4">
                <button onClick={() => setSearchVisible(true)} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                    ➕ Add to Bookshelf
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
            {popupOpen && selectedBook && (
                <Popup book={selectedBook} onClose={handleClosePopup} onBookAdded={handleBookAdded} />
            )}
        </section>
    )
}

export default Profile
