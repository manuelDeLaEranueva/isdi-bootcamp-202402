import mongoose, { ObjectId } from 'mongoose'

const { Schema, model } = mongoose

const { Types: { ObjectId } } = Schema

type UserType = {
    name: string
    birthdate: Date
    email: string
    username: string
    password: string
}


const user = new Schema({
    name: {
        type: String,
        required: true
    },
    birthdate: {
        type: Date,
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
        required: true
    }
})

type PostType = {
    author: ObjectId
    image: string
    text: string
    date: Date
}

const post = new Schema({
    author: {
        type: ObjectId,
        ref: 'User',
        required: true
    },
    image: {
        type: String,
        required: true
    },
    text: {
        type: String
    },
    date: {
        type: Date,
        required: true
    }
})

const User = model<UserType>('User', user)
const Post = model<PostType>('Post', post)

export {
    UserType,
    User,
    PostType,
    Post
}