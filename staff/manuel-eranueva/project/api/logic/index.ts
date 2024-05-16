import registerUser from './registerUser.ts'
import authenticateUser from './authenticateUser.ts'
import retrieveUser from './retrieveUser.ts'
import retrieveBooks from './retrieveBooks.ts'
import createCard from './createCard.ts'
import retrieveCards from './retrieveCards.ts'
import deleteCard from './deleteCard.ts'
import retrieveUserBooks from './retrieveUserBooks.ts'

const logic = {
    registerUser,
    authenticateUser,
    retrieveUser,
    retrieveBooks,
    createCard,
    retrieveCards,
    deleteCard,
    retrieveUserBooks
}

export default logic