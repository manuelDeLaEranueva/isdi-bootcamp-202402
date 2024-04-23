// import { logger } from '../utils'

import logic from '../src/logic'

import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
// import Profile from '../components/Profile'

import { useContext } from '../src/context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)


    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            onUserLoggedOut()
        }
    }


    return <>
        <header >
            {user && <h1>Hello, {user.name}!</h1>}
            <nav>
                <button onClick={handleLogoutClick}>🚪</button>
            </nav>



        </header>
    </>
}

export default Home