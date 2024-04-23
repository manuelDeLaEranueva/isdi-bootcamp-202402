import mongoose from 'mongoose'

import { User } from '.'


mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'Pepe Roni', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))

    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)