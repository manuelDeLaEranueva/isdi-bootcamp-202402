import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import logic from '../logic'
import { useContext } from '../context.js'
import retrieveUserBooks from '../logic/retrieveUserBooks.js'
import UserBookList from '../components/UserBookList.jsx'

function Profile() {
    const { showFeedback } = useContext()
    const [user, setUser] = useState(null)
    const [bookselves, setBookselves] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await logic.retrieveUser()
                setUser(userData)

                const bookselves = await retrieveUserBooks()
                setBookselves(bookselves)
            } catch (error) {
                alert(error)
            }
        }
        fetchData()
    }, [])

    return (
        <section className="bg-[#6E8BB3] flex flex-col mx-4">

            <Link to="/" className="flex items-center h-full px-4">
                <img src="../../public/home.png" alt="home" className="w-8 h-8" />
            </Link>
            <div className="flex flex-col items-center justify-center h-full px-4">
                {user && (
                    <h1 className="text-white font-bold text-xl">
                        Hola, {user.username}
                    </h1>
                )}
            </div>

            <section className="mt-4">
                <UserBookList books={bookselves} />
            </section>
        </section>
    );
}

export default Profile;
