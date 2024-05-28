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
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/51uXGZ0NrHL._SX331_BO1,204,203,200_.jpg',
            name: 'Watchmen',
            author: 'Alan Moore',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81HQiAnRWlL.jpg',
            name: 'Maus',
            author: 'Art Spiegelman',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/91GSIDNUSML.jpg',
            name: 'V for Vendetta',
            author: 'Alan Moore',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/71+FvjM9OwL.jpg',
            name: 'Persepolis',
            author: 'Marjane Satrapi',
            country: 'Iran'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/61p+AOxG-ML.jpg',
            name: 'Sandman',
            author: 'Neil Gaiman',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81IDYFA4q3L.jpg',
            name: 'Y: The Last Man',
            author: 'Brian K. Vaughan',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/61mB9Ykl8-L.jpg',
            name: 'Batman: Year One',
            author: 'Frank Miller',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81nsKbF+aFL.jpg',
            name: 'Akira',
            author: 'Katsuhiro Otomo',
            country: 'Japan'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/91IDP8xCeTL.jpg',
            name: 'Ghost in the Shell',
            author: 'Masamune Shirow',
            country: 'Japan'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81A-mvlo+QL.jpg',
            name: 'The Dark Knight Returns',
            author: 'Frank Miller',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81iKc7d0u1L.jpg',
            name: 'Blankets',
            author: 'Craig Thompson',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/91qk1p9XErL.jpg',
            name: 'Scott Pilgrim',
            author: 'Bryan Lee O\'Malley',
            country: 'Canada'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81GeAcdMCsL.jpg',
            name: 'Understanding Comics',
            author: 'Scott McCloud',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81Uw03fjh5L.jpg',
            name: 'Fun Home',
            author: 'Alison Bechdel',
            country: 'USA'
        },
        {
            image: 'https://images-na.ssl-images-amazon.com/images/I/81Z5Wc0AciL.jpg',
            name: 'From Hell',
            author: 'Alan Moore',
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
