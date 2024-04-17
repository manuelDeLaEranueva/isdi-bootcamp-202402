import { validate, errors } from 'com'

function createPost(image, text) {
    validate.url(image, 'image')
    if (text)
        validate.text(text, 'text')

    const post = { image, text }

    const json = JSON.stringify(post)

    return fetch('http://localhost:8080/posts', {
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

export default createPost