import logic from './logic.mjs'

import Component from './components/core/Component.mjs'

import Landing from './pages/Landing.mjs'
import Login from './pages/Login.mjs'
import Register from './pages/Register.mjs'
import Home from './pages/Home.mjs'

const root = new Component(document.body)

const landing = new Landing
const register = new Register
const login = new Login
let home

landing.onLoginClick(() => root.replace(landing, login))
landing.onRegisterClick(() => root.replace(landing, register))

login.onRegisterClick(() => root.replace(login, register))
login.onUserLoggedIn(() => {
    buildHome()

    root.replace(login, home)
})

register.onLoginClick(() => root.replace(register, login))
register.onUserRegistered(() => root.replace(register, login))

if (!logic.isUserLoggedIn())
    root.add(landing)
else {
    buildHome()

    root.add(home)
}

// helper

function buildHome() {
    home = new Home

    home.onLogout(() => root.replace(home, login))
}