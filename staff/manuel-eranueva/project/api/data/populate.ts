import mongoose from 'mongoose';
import { User, Book, Card, MyBookself } from '.';

mongoose.connect('mongodb://localhost:27017/project')
    .then(() => User.deleteMany())
    .then(() => User.create({ name: 'manuel', email: 'manu@manu.com', username: 'manuel', password: '123qwe123' }))
    .then(() => Book.deleteMany())
    .then(() => Book.create([
        {
            image: 'https://pics.filmaffinity.com/One_Piece_Serie_de_TV-647985949-large.jpg',
            name: 'One Piece',
            author: 'Eiichiro Oda',
            country: 'Japan'
        },
        {
            image: 'https://m.media-amazon.com/images/I/51iUNDapNML.jpg',
            name: 'Saga',
            author: 'Brian K. Vaughan',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/61wyk+JqlIL._AC_UF1000,1000_QL80_.jpg',
            name: 'Bone',
            author: 'Jeff Smith',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/81tst4OxzZL._SY425_.jpg',
            name: 'The Walking Dead',
            author: 'Robert Kirkman',
            country: 'USA'
        }
    ]))
    .then(() => Card.deleteMany())
    .then(() => {

        return Book.findOne({ name: 'One Piece' })
            .then((book) => {
                if (!book) throw new Error('Book not found');

                return User.findOne({ name: 'manuel' })
                    .then((user) => {
                        if (!user) throw new Error('User not found');

                        return Card.create({
                            book: book._id,
                            owner: user._id
                        });
                    });
            });
    })
    .then(() => MyBookself.deleteMany())
    .then(() => {

        return Book.findOne({ name: 'One Piece' })
            .then((book) => {
                if (!book) throw new Error('Book not found');

                return User.findOne({ name: 'manuel' })
                    .then((user) => {
                        if (!user) throw new Error('User not found');

                        return MyBookself.create({
                            book: book._id,
                            owner: user._id
                        });
                    });
            });
    })
    .then(() => mongoose.disconnect())
    .then(() => console.log('populated'))
    .catch(console.error);
