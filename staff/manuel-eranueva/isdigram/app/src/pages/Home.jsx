import { logger, showFeedback } from '../utils'

import logic from '../logic'

import { useState, useEffect } from 'react'
import PostList from '../components/PostList'
import CreatePost from '../components/CreatePost'
import EditPost from '../components/EditPost'

function Home(props) {
    const [user, setUser] = useState(null)
    const [view, setView] = useState(null)
    const [stamp, setStamp] = useState(null)
    const [post, setPost] = useState(null)

    useEffect(() => {
        try {
            logic.retrieveUser()
                //.then(user => setUser(user))
                .then(setUser)
                .catch(showFeedback)
        } catch (error) {
            showFeedback(error)
        }
    }, [])

    const clearView = () => setView(null)

    const handleCreatePostCancelClick = () => clearView()

    const handlePostCreated = () => {
        clearView()
        setStamp(Date.now())
    }

    const handleCreatePostClick = () => setView('create-post')

    const handleLogoutClick = () => {
        try {
            logic.logoutUser()
        } catch (error) {
            logic.cleanUpLoggedInUserId()
        } finally {
            props.onUserLoggedOut()
        }
    }

    const handleEditPostCancelClick = () => clearView()

    const handleEditPostClick = post => {
        setView('edit-post')
        setPost(post)
    }

    const handlePostEdited = () => {
        clearView()
        setStamp(Date.now())
        setPost(null)
    }

    logger.debug('Home -> render')

    return <>
        <header className="px-[5vw] fixed top-0 bg-white w-full">
            {user && <h1>Hello, {user.name}!</h1>}

            <nav>
                <button onClick={handleLogoutClick}>🚪</button>
            </nav>
        </header>

        <main className="my-[50px] px-[5vw]">
            <PostList stamp={stamp} onEditPostClick={handleEditPostClick} />

            {view === 'create-post' && <CreatePost onCancelClick={handleCreatePostCancelClick} onPostCreated={handlePostCreated} />}

            {view === 'edit-post' && <EditPost post={post} onCancelClick={handleEditPostCancelClick} onPostEdited={handlePostEdited} />}
        </main>

        <footer className="fixed bottom-0 w-full h-[50px] flex justify-center items-center p-[10px] box-border bg-white">
            <button onClick={handleCreatePostClick}>➕</button>
        </footer>
    </>
}

export default Home