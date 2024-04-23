import { util, validate } from 'com'

function getLoggedInUserId() {
    validate.token(sessionStorage.token)

    const { sub: userId } = util.extractJwtPayload(sessionStorage.token)

    return userId
}

export default getLoggedInUserId