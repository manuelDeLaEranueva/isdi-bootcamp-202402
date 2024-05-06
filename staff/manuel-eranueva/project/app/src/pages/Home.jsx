import React, { useState, useEffect } from 'react';
import logic from '../logic';
import BookList from '../components/BookList';
import Popup from '../components/Popup';

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);
    const [selectedBook, setSelectedBook] = useState(null);
    const [popupOpen, setPopupOpen] = useState(false);

    useEffect(() => {
        // Retrieve user data
        logic.retrieveUser()
            .then(user => setUser(user))
            .catch(error => console.error('Failed to retrieve user:', error));

        // Retrieve book data
        logic.retrieveBooks()
            .then(books => setBooks(books))
            .catch(error => console.error('Failed to retrieve books:', error));
    }, []);

    const handleLogoutClick = () => {
        try {
            logic.logoutUser();
            onUserLoggedOut();
        } catch (error) {
            console.error('Logout failed:', error);
            logic.cleanUpLoggedInUserId();
        }
    };

    const handleSelectedBook = (book) => {
        setSelectedBook(book);
        setPopupOpen(true);
    };

    const handleClosePopup = () => {
        setSelectedBook(null);
        setPopupOpen(false);
    };

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
                {popupOpen && selectedBook && <Popup book={selectedBook} onClose={handleClosePopup} />}
            </main>
        </>
    );
}

export default Home;
