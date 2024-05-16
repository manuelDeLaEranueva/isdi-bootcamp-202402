import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logic from '../logic';
import { useContext } from '../context.js';
import Card from '../components/Card';
import CardList from '../components/CardList.jsx';
import retrieveUserCards from '../logic/retrieveUserCards.js';
import retrieveUserBooks from '../logic/retrieveUserBooks.js';
import UserBookList from '../components/UserBookList.jsx';
import UserBook from '../components/UserBook'

function Profile() {
    const { showFeedback } = useContext();
    const [user, setUser] = useState(null);
    const [bookselves, setBookselves] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const userData = await logic.retrieveUser();
                setUser(userData);

                const bookselves = await retrieveUserBooks();
                setBookselves(bookselves);
            } catch (error) {
                alert(error);
            }
        }
        fetchData();
    }, []);

    return (
        <section className="h-full bg-[#6E8BB3] flex flex-col justify-start mt-4 mx-4">
            <div className="sticky top-[80px] z-20 flex justify-between items-start bg-[#6E8BB3] p-4">
                <Link to="/">
                    <img src="../../public/home.png" alt="home" className="w-8 h-8" />
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
        </section>
    );
}

export default Profile;
