import logic from '../logic.mjs'

import Login from './Login.mjs'

if (logic.isUserLoggedIn())
    location.href = '../home'
else {
    const login = new Login

    login.assembleTo(document.body)
}