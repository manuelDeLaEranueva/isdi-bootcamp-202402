//@ts-nocheck
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import logic from './index.ts';
import { expect } from 'chai';
import { errors } from 'com';
import { User, Card, Book } from '../data/index.ts';

dotenv.config();

const { NotFoundError } = errors;

describe('retrieveCards', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL));

    it('retrieves all cards for existing user', () => {
        let user;
        let book1;
        let book2;

        return Promise.all([User.deleteMany(), Card.deleteMany(), Book.deleteMany()])
            .then(() => {
                return User.create({
                    name: 'Pepe Roni',
                    email: 'pepe@roni.com',
                    username: 'peperoni',
                    password: '123qwe123'
                });
            })
            .then(createdUser => {
                user = createdUser;

                return Promise.all([
                    Book.create({
                        image: '...',
                        name: 'Book 1',
                        author: 'Author 1'
                    }),
                    Book.create({
                        image: '...',
                        name: 'Book 2',
                        author: 'Author 2'
                    })
                ]);
            })
            .then(([createdBook1, createdBook2]) => {
                book1 = createdBook1;
                book2 = createdBook2;

                return Promise.all([
                    Card.create({
                        book: book1._id,
                        owner: user._id,
                        image: 'https://m.media-amazon.com/images/I/71lV0Qc6ApL._AC_UF894,1000_QL80_.jpg',
                        name: 'Hierba',
                        author: 'Keum Suk Gendry-Kim'
                    }),
                    Card.create({
                        book: book2._id,
                        owner: user._id,
                        image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDzvc968j48yhNhxhlboT578obXky8DvpaATodIjItQ&s',
                        name: 'Crisis Zone',
                        author: 'Hanselmann'
                    })
                ]);
            })
            .then(([card1, card2]) => {
                return logic.retrieveCards(user.id)
                    .then(cards => {
                        expect(cards).to.have.lengthOf(2);

                        const card1b = cards.find(card => card.image === card1.image);
                        expect(card1b?.book?.name).to.equal('Book 1');
                        expect(card1b?.book?.author).to.equal('Author 1');
                        expect(card1b?.owner?.toString()).to.equal(user._id.toString());

                        const card2b = cards.find(card => card.image === card2.image);
                        expect(card2b?.book?.name).to.equal('Book 2');
                        expect(card2b?.book?.author).to.equal('Author 2');
                        expect(card2b?.owner?.toString()).to.equal(user._id.toString());
                    });
            });
    });

    after(() => mongoose.disconnect());
});
