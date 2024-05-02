import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

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

type CardType = {
    image: string
    name: string
    author: string
    owner: ObjectId
}

const card = new Schema({
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
    },
    owner: {
        type: ObjectId,
        ref: 'User',
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
const Card = model<CardType>('Card', card)

export {
    UserType,
    User,
    BookType,
    Book,
    CardType,
    Card
}
