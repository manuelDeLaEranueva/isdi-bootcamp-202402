import { validate, errors } from 'com'

function retrieveUserBooks() {
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/mybookselves`, {
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

export default retrieveUserBooks