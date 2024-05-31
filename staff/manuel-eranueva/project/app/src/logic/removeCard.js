import { validate, errors } from 'com'

function removeCard(cardId) {
    validate.text(cardId, 'cardId', true)
    validate.token(sessionStorage.token)

    return fetch(`${import.meta.env.VITE_API_URL}/cards/${cardId}`, {
        method: 'DELETE',
        headers: {
            Authorization: `Bearer ${sessionStorage.token}`,
        }
    })
        .then(res => {
            if (res.status === 204) // 204 for no content
                return
            return res.json()
                .then(body => {
                    const { error, message } = body
                    const constructor = errors[error]
                    throw new constructor(message)
                })
        })
}

export default removeCard