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
        <main className="flex flex-col items-center justify-center h-screen bg-white">
            <img src="../../public/bookself.png" alt="bookself" className="w-64 h-auto relative -top-24" />
            <h1 className="text-3xl font-bold mb-8">Register</h1>

            <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-6">
                <div className="flex flex-col space-y-1">
                    <label htmlFor="name" className="text-lg font-semibold">
                        Name
                    </label>
                    <input type="text" id="name" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="email" className="text-lg font-semibold">
                        E-mail
                    </label>
                    <input type="email" id="email" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="username" className="text-lg font-semibold">
                        Username
                    </label>
                    <input id="username" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />
                </div>

                <div className="flex flex-col space-y-1">
                    <label htmlFor="password" className="text-lg font-semibold">
                        Password
                    </label>
                    <input type="password" id="password" className="border border-gray-300 rounded px-3 py-2 w-64 focus:outline-none" />
                </div>

                <button className="bg-[#050CA6] text-white font-semibold py-2 px-6 rounded hover:bg-blue-600 focus:outline-none" type="submit">
                    Register
                </button>
            </form>

            <a href="#" onClick={handleLoginClick} className="text-blue-500 mt-4 hover:underline">Login</a>
        </main>
    )
}

export default Register
