import { logger } from '../utils'

import logic from '../logic'

import { useContext } from '../context'

function Register({ onUserRegistered, onLoginClick }) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const name = form.name.value
        const email = form.email.value
        const username = form.username.value
        const password = form.password.value

        try {
            logic.registerUser(name, email, username, password)
                .then(() => {
                    form.reset()

                    onUserRegistered()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleLoginClick = event => {
        event.preventDefault()

        onLoginClick()
    }

    logger.debug('Register -> render')

    return (
        <div className="flex justify-center items-center h-screen bg-white">
            <main>
                <h1 className="text-3xl font-bold mb-8">Register</h1>
                <form onSubmit={handleSubmit} className="flex flex-col items-center mt-10">
                    <div className="flex flex-col mb-4">
                        <label htmlFor="name" className="text-gray-800 mb-1">Name</label>
                        <input type="text" id="name" className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none" />

                        <label htmlFor="email" className="text-gray-800 mb-1 mt-2">E-mail</label>
                        <input type="email" id="email" className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none" />

                        <label htmlFor="username" className="text-gray-800 mb-1 mt-2">Username</label>
                        <input id="username" className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none" />

                        <label htmlFor="password" className="text-gray-800 mb-1 mt-2">Password</label>
                        <input type="password" id="password" className="border border-gray-300 rounded-lg px-3 py-2 w-64 focus:outline-none" />
                    </div>

                    <button className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-6 rounded mt-2 focus:outline-none" type="submit">Register</button>
                </form>
            </main>
            <div class="fixed bottom-8 items-center">
                <a href="" onClick={handleLoginClick} class="text-blue-500 mt-2 font-semibold">Login</a>
            </div>
        </div>
    )
}

export default Register