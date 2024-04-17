function getLoggedInUserId() {
    const [, payloadB64] = sessionStorage.token.split('.')

    const payloadJSON = atob(playloadB64)

    const payload = JSON.parse(payloadJSON)

    const { sub: userId } = payload

    return userId
}

export default getLoggedInUserId