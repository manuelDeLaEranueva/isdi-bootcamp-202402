import { validate, errors } from 'com'

function logoutUser() {
    delete sessionStorage.userId
}

export default logoutUser