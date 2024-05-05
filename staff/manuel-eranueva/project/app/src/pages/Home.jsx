import logic from '../logic'
import React, { useState, useEffect } from 'react'
import BookList from '../components/BookList'
import CreateCard from '../components/Card'

import { Routes, Route } from 'react-router-dom'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [books, setBooks] = useState([])

    useEffect(() => {

        logic.retrieveUser()
            .then(user => {
                setUser(user)
            })
            .catch(error => {
                console.error('Failed to retrieve user:', error);
            })

        logic.retrieveBooks()
            .then(books => {
                setBooks(books)
            })
            .catch(error => {
                console.error('Failed to retrieve books:', error);
            })
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

    return (
        <>
            <header>

                {user && <h1> {user.name}'s Bookself</h1>}
                <nav>

                    <button onClick={handleLogoutClick}>🚪 Logout</button>
                    <button onClick>Create Card</button>
                </nav>
            </header>
            <main>

                <BookList books={books} />
            </main>
        </>
    )
}

export default Home