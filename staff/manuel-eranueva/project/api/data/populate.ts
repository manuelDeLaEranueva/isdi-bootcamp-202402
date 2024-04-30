import mongoose, { isObjectIdOrHexString } from 'mongoose'

import { User, Book } from '.'


mongoose.connect('mongodb://localhost:27017/project')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'Pepe Roni', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
    .then(() => Book.deleteMany())
    .then(() => Book.create({
        image: 'https://example.com/image17.jpg',
        name: 'One Piece',
        author: 'Eiichiro Oda',
        country: 'Japan'
    },
        {
            image: 'https://example.com/image18.jpg',
            name: 'Saga',
            author: 'Brian K. Vaughan',
            country: 'USA'
        },
        {
            image: 'https://example.com/image19.jpg',
            name: 'Bone',
            author: 'Jeff Smith',
            country: 'USA'
        },
        {
            image: 'https://example.com/image20.jpg',
            name: 'The Walking Dead',
            author: 'Robert Kirkman',
            country: 'USA'
        }))

    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)