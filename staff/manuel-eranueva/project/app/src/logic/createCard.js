import { errors } from 'com'

function createCard(bookId) {

    const card = { "bookId": bookId }

    const json = JSON.stringify(card)

    return fetch(`${import.meta.env.VITE_API_URL}/cards`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
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

export default createCard