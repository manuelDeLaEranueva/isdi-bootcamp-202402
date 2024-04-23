import { validate, errors } from 'com'

function registerUser(name, email, username, password) {
    validate.text(name, 'name')
    validate.email(email)
    validate.text(username, 'username', true)
    validate.password(password)

    const user = { name, email, username, password }

    const json = JSON.stringify(user)

    return fetch(`${import.meta.env.VITE_API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: json
    })
        .then(res => {
            if (res.status === 201) return

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default registerUser