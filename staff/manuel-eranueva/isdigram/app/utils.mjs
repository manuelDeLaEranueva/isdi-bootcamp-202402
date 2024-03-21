function showFeedback(error) {
    console.error(error)

    alert(error.message)
}

const utils = {
    showFeedback
}

export default utils