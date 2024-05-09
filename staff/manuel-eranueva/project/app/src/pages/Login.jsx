import { logger } from '../utils'
import logic from '../logic'
import { useContext } from '../context'

function Login({ onUserLoggedIn, onRegisterClick }) {
    const { showFeedback } = useContext()

    const handleSubmit = event => {
        event.preventDefault()

        const form = event.target

        const username = form.username.value
        const password = form.password.value

        logger.debug('Login -> handleSubmit', username, password)

        try {
            logic.loginUser(username, password)
                .then(() => {
                    form.reset()
                    onUserLoggedIn()
                })
                .catch(error => showFeedback(error, 'error'))
        } catch (error) {
            showFeedback(error)
        }
    }

    const handleRegisterClick = event => {
        event.preventDefault()
        onRegisterClick()
    }

    return (
        <main className="flex flex-col items-center justify-center h-screen bg-white">
            <h1 className="text-3xl font-bold mb-8">Login</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
                <label htmlFor="username" className="text-lg font-semibold">
                    Username
                </label>
                <input id="username" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />

                <label htmlFor="password" className="text-lg font-semibold">
                    Password
                </label>
                <input type="password" id="password" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />

                <button className="bg-blue-500 text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 focus:outline-none" type="submit">
                    Login
                </button>
            </form>

            <a href="#" onClick={handleRegisterClick} className="text-blue-500 mt-4 hover:underline">Register</a>
        </main>
    )
}

export default Login
