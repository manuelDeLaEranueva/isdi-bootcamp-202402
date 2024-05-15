//@ts-nocheck
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
    book: ObjectId
    owner: ObjectId
}

const card = new Schema({
    book: {
        type: ObjectId,
        ref: 'Book',
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
