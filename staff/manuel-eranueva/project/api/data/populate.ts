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
            image: 'https://www.wellslibros.com/wp-content/uploads/2021/02/watchmen4edicion-scaled.jpg',
            name: 'Watchmen',
            author: 'Alan Moore',
            country: 'USA'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRqAs8ppZqNa0O8y4u9K56wdLLmqmoVwKd4MnVGmzUsYA&s',
            name: 'Maus',
            author: 'Art Spiegelman',
            country: 'USA'
        },
        {
            image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRHu66tcKKEe3D7C9L1DcOnO98hLuHB-HHHHx1jzDunag&s',
            name: 'V for Vendetta',
            author: 'Alan Moore',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/71P5eadu8oL._AC_UF894,1000_QL80_.jpg',
            name: 'Persepolis',
            author: 'Marjane Satrapi',
            country: 'Iran'
        },
        {
            image: 'https://m.media-amazon.com/images/I/91-XeIW3CML._AC_UF894,1000_QL80_.jpg',
            name: 'Sandman',
            author: 'Neil Gaiman',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/71lBTGxPOOL._AC_UF1000,1000_QL80_.jpg',
            name: 'Y: The Last Man',
            author: 'Brian K. Vaughan',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/61+hFGCapwL._AC_UF1000,1000_QL80_.jpg',
            name: 'Batman: Year One',
            author: 'Frank Miller',
            country: 'USA'
        },
        {
            image: 'https://www.normaeditorial.com/upload/media/albumes/0001/07/3d0080c7eaa586a0cd688964b8cd3748abf10381.jpeg',
            name: 'Akira',
            author: 'Katsuhiro Otomo',
            country: 'Japan'
        },
        {
            image: 'https://m.media-amazon.com/images/I/91dnrSQp62L._AC_UF1000,1000_QL80_.jpg',
            name: 'Ghost in the Shell',
            author: 'Masamune Shirow',
            country: 'Japan'
        },
        {
            image: 'https://m.media-amazon.com/images/I/917wsCEYSML._AC_UF1000,1000_QL80_.jpg',
            name: 'The Dark Knight Returns',
            author: 'Frank Miller',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/81ClZo93byL._AC_UF894,1000_QL80_.jpg',
            name: 'Blankets',
            author: 'Craig Thompson',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/71K-qMTslrL._AC_UF894,1000_QL80_.jpg',
            name: 'Scott Pilgrim',
            author: 'Bryan Lee O\'Malley',
            country: 'Canada'
        },
        {
            image: 'https://m.media-amazon.com/images/I/71vIFzQbtbL._AC_UF1000,1000_QL80_.jpg',
            name: 'Understanding Comics',
            author: 'Scott McCloud',
            country: 'USA'
        },
        {
            image: 'https://www.normacomics.com/media/catalog/product/cache/564c053b4c63190579f642461183ef0b/5/6/56260002801_G.jpg',
            name: 'Fun Home',
            author: 'Alison Bechdel',
            country: 'USA'
        },
        {
            image: 'https://m.media-amazon.com/images/I/81ttRos+zrL._AC_UF894,1000_QL80_.jpg',
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
