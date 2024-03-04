// business (logic)

function registerUser(name, birthdate, email, username, password) {
    var exists = users.some(function (user) {
        return user.email === email || user.username === username
    })

    if (exists) throw new Error('user already exists')

    var user = {
        name: name,
        birthdate: birthdate,
        email: email,
        username: username,
        password: password
    }

    users.push(user)

    localStorage.users = JSON.stringify(users)
}

function loginUser(username, password) {
    var match = users.some(function (user) {
        return user.username === username && user.password === password
    })

    if (!match) throw new Error('wrong credentials')

    sessionStorage.username = username
}

function retrieveUser(username) {
    var user = users.find(function (user) {
        return user.username === username
    })

    if (!user) throw new Error('user not found')

    return user
}

