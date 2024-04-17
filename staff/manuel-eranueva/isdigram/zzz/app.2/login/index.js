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

        var usernameInput = document.getElementById('username')
        var username = usernameInput.value

        var passwordInput = document.getElementById('password')
        var password = passwordInput.value

        try {
            logic.loginUser(username, password)

            form.reset()

            location.href = '../home'
        } catch (error) {
            alert(error.message)
        }
    })
})()