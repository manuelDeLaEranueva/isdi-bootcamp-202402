var ship = document.getElementById('ship')
var alien = document.getElementById('alien')

var x = 0

ship.style.left = x + 'vw'


document.onkeydown = function (event) {
    console.count('keydown')

    if (event.key === 'ArrowLeft')
        x = x - 1
    else if (event.key === 'ArrowRight')
        x = x + 1

    ship.style.left = x + 'vw'

    // var shipRect = ship.getBoundingClientRect()
    // var alienRect = alien.getBoundingClientRect()

    // console.log(shipRect, alienRect)

    // if (shipRect.x + shipRect.width > alienRect.x) {
    //     ship.src = 'images/boom.png'
    //     alien.src = 'images/boom.png'

    //     setTimeout(function () {
    //         ship.style.display = 'none'
    //         alien.style.display = 'none'
    //     }, 2000)
    // }
}