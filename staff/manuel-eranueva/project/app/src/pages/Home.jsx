import logic from '../logic';
import { useState, useEffect } from 'react';
import BookList from '../components/BookList';

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null);
    const [books, setBooks] = useState([]);

    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => console.log(error));

            logic.retrieveBooks()
                .then(setBooks)
                .catch(error => console.log(error));
        } catch (error) {
            console.log(error);
        }
    }, []);

    const handleLogoutClick = () => {
        try {
            logic.logoutUser();
        } catch (error) {
            logic.cleanUpLoggedInUserId();
        } finally {
            onUserLoggedOut();
        }
    };

    return (
        <>
            <header>
                {user && <h1>Hello, {user.name}!</h1>}
                <nav>
                    <button onClick={handleLogoutClick}>🚪</button>
                </nav>
            </header>
            <main>
                <BookList books={books} />
            </main>
        </>
    );
}

export default Home;
