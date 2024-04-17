function isUserLoggedIn() {
    return !!sessionStorage.userId
}

export default isUserLoggedIn