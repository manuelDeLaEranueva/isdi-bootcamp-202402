import { validate, errors } from 'com'

function retrieveCards() {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cards`, {
        headers: {
            'Authorization': `Bearer ${sessionStorage.token}`
        }
    })
        .then(res => {
            if (!res.ok) {
                throw new Error('Failed to retrieve cards')
            }
            return res.json()
        })
        .catch(error => {
            console.error('Error retrieving cards:', error)
            throw new Error('Failed to retrieve cards')
        });
}

export default retrieveCards