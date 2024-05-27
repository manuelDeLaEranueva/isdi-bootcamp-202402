import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveBooks from './retrieveBooks.ts'
import createCard from './createCard.ts'
import retrieveCards from './retrieveCards.ts'
import removeCard from './removeCard.ts'
import retrieveUserBooks from './retrieveUserBooks.ts'
import addToBookshelf from './addToBookshelf.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveBooks,
    createCard,
    retrieveCards,
    removeCard,
    retrieveUserBooks,
    addToBookshelf
}

export default logic