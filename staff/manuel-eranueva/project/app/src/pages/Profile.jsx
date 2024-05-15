import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import logic from '../logic';
import { useContext } from '../context.js';

function Profile() {
    const { showFeedback } = useContext();
    const [view, setView] = useState(null);
    const [user, setUser] = useState(null);

    useEffect(() => {
        async function fetchUserData() {
            try {
                const userData = await logic.retrieveUser();
                setUser(userData);
            } catch (error) {
                alert(error);
            }
        }
        fetchUserData();
    }, []);

    const clearView = () => setView(null);

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


        </section>
    );
}

export default Profile;