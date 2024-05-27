import { validate, errors } from 'com'

function addToBookshelf(bookId) {
    validate.text(bookId, 'bookId', true)
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/mybookselves`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ bookId })
    })
        .then(res => {
            if (res.status === 201) // 201 for created
                return res.json()
            return res.json()
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default addToBookshelf
