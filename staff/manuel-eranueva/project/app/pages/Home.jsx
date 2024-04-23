// import { logger } from '../utils'

import logic from '../src/logic'

import { useState, useEffect } from 'react'

import { Routes, Route } from 'react-router-dom'
// import Profile from '../components/Profile'

import { useContext } from '../src/context'

function Home({ onUserLoggedOut }) {
    const [user, setUser] = useState(null)


    useEffect(() => {
        try {
            logic.retrieveUser()
                .then(setUser)
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }, [])

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

        </header>
    </>
}

export default Home