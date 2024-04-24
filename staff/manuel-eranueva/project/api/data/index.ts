import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

type BookType = {
    image: string
    name: string
    author: string
}

const book = new Schema({
    image: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    author: {
        type: String,
        required: true
    }
})

type UserType = {
    name: string
    email: string
    username: string
    password: string
    avatar: string
}

const user = new Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    username: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true,
    },

    avatar: {
        type: String,

    }

})

const User = model<UserType>('User', user)
const Book = model<BookType>('Book', book)

export {
    UserType,
    User,
    BookType,
    Book
}
