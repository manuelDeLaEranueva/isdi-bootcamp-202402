import { validate, errors } from 'com'

import { User } from '../data/index.ts'

const { SystemError, CredentialsError, NotFoundError } = errors

function authenticateUser(username: string, password: string): Promise<string> {
    validate.text(username, 'username', true)
    validate.password(password)

    return User.findOne({ username })
        .catch(error => { throw new SystemError(error.message) })
        .then(user => {
            if (!user)
                throw new NotFoundError('user not found')

            if (user.password !== password)
                throw new CredentialsError('wrong password')

            return user.id
        })

}

export default authenticateUser