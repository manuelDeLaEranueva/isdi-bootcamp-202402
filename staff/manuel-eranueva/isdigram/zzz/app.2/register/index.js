// presentation

(function () {
    if (logic.isUserLoggedIn()) {
        location.href = '../home'

        return
    }

    var form = document.querySelector('form')

    form.addEventListener('submit', function (event) {
        console.log('form submit')

        event.preventDefault()

        var nameInput = document.getElementById('name')
        var name = nameInput.value

        var birthdateInput = document.getElementById('birthdate')
        var birthdate = birthdateInput.value

        var emailInput = document.getElementById('email')
        var email = emailInput.value

        var usernameInput = document.getElementById('username')
        var username = usernameInput.value

        var passwordInput = document.getElementById('password')
        var password = passwordInput.value

        try {
            logic.registerUser(name, birthdate, email, username, password)

            form.reset()

            location.href = '../login'
        } catch (error) {
            alert(error.message)
        }
    })
})()