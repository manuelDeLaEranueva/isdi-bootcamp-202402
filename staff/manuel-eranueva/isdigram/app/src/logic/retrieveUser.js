import { validate, errors } from 'com'

function retrieveUser() {
    const [, payloadB64] = sessionStorage.token.split('.')

    const playloadJSON = atob(payloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    return fetch(`http://localhost:8080/users/${userId}`, {
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (res.status === 200)
                return res.json()

            return res.json()
                .then(body => {
                    const { error, message } = body

                    const constructor = errors[error]

                    throw new constructor(message)
                })
        })
}

export default retrieveUser