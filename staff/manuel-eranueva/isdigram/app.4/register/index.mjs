import logic from '../logic.mjs'

import Register from './Register.mjs'

if (logic.isUserLoggedIn())
    location.href = '../home'
else {
    const register = new Register

    register.assembleTo(document.body)
}