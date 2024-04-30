import logic from '../logic'
import React, { useState, useEffect } from 'react'
import BookList from '../components/BookList'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        // Retrieve the logged-in user's information
        logic.retrieveUser()
            .then(user => {
                setUser(user);
            })
            .catch(error => {
                console.error('Failed to retrieve user:', error);
            });

        // Retrieve the books to display
        logic.retrieveBooks()
            .then(books => {
                setBooks(books);
            })
            .catch(error => {
                console.error('Failed to retrieve books:', error);
            });
    }, []);

    const handleLogoutClick = () => {
        // Attempt to log out the user
        try {
            logic.logoutUser();
            onUserLoggedOut();
        } catch (error) {
            console.error('Logout failed:', error);
            logic.cleanUpLoggedInUserId();
        }
    };

    return (
        <>
            <header>
                {/* Display the user's name if they are logged in */}
                {user && <h1>Hello, {user.name}!</h1>}
                <nav>
                    {/* Logout button */}
                    <button onClick={handleLogoutClick}>🚪 Logout</button>
                </nav>
            </header>
            <main>
                {/* BookList component to display the list of books */}
                <BookList books={books} />
            </main>
        </>
    );
}

export default Home;