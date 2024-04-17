import mongoose from 'mongoose'

import { User, Post } from '.'


mongoose.connect('mongodb://localhost:27017/isdigram')
    .then(() => User.deleteMany())
    .then(() => Post.deleteMany())
    .then(() => User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }))
    .then(user1 => {
        let count = 1

        const post1 = { author: user1._id, image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`, text: `hello post ${count}`, date: new Date }

        return Post.create(post1)
            .then(() => {
                count++

                const post2 = { author: user1._id, image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`, text: `hello post ${count}`, date: new Date }

                return Post.create(post2)
            })
            .then(() => {
                count++

                const post3 = { author: user1._id, image: `https://fakeimg.pl/500x400/ff0000?text=Hello+${count}&font=lobster`, text: `hello post ${count}`, date: new Date }

                return Post.create(post3)
            })
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error)