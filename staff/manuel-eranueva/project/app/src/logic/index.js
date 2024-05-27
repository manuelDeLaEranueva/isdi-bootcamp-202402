import registerUser from './registerUser'
import loginUser from './loginUser'
import retrieveUser from './retrieveUser'
import logoutUser from './logoutUser'
import getLoggedInUserId from './getLoggedInUserId'
import isUserLoggedIn from './isUserLoggedIn'
import cleanUpLoggedInUserId from './cleanUpLoggedInUserId'
import retrieveBooks from './retrieveBooks'
import removeCard from './removeCard'
import createCard from './createCard'
import retrieveCards from './retrieveCards'
import retrieveUserCards from './retrieveUserCards'
import retrieveUserBooks from './retrieveUserBooks'
import addToBookshelf from './addToBookself'




const logic = {
    registerUser,
    loginUser,
    retrieveUser,
    logoutUser,
    getLoggedInUserId,
    isUserLoggedIn,
    cleanUpLoggedInUserId,
    retrieveBooks,
    removeCard,
    createCard,
    retrieveCards,
    retrieveUserCards,
    retrieveUserBooks,
    addToBookshelf
}

export default logic