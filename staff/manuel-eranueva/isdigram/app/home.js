//presentation

var title = document.querySelector('h1')
var logoutButton = document.querySelector('button')

try {
    var user = retrieveUser(sessionStorage.username)

    title.innerText = 'Hello, ' + user.name + '!'
} catch (error) {
    alert(error.message)
}

logoutButton.addEventListener('click', function () {
    sessionStorage.clear()

    var loginAdress = location.href.replace('home', 'login')

    location.href = loginAdress
})