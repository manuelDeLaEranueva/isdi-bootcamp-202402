//@ts-nocheck
import dotenv from 'dotenv'

import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

import { User, Book, BookType, Card, CardType } from '../data/index.ts'

dotenv.config()

describe('createCard', () => {
    before(() => mongoose.connect(process.env.MONGODB_TEST_URL))

    it('user creates card', () =>
        Promise.all([
            User.deleteMany(),
            Book.deleteMany(), 
            Card.deleteMany()
        ])
            .then(() =>
                User.create({ name: 'Pepe Roni', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(user =>
                        Book.create({ image: '...', name: 'Book Name', author: 'Book Author' }) 
                            .then(book =>
                                Promise.all([
                                    Card.create({ book: book._id, owner: user._id, image: 'https://m.media-amazon.com/images/I/71lV0Qc6ApL._AC_UF894,1000_QL80_.jpg', name: 'Hierba', author: 'Keum Suk Gendry-Kim' }),
                                    Card.create({ book: book._id, owner: user._id, image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTGDzvc968j48yhNhxhlboT578obXky8DvpaATodIjItQ&s', name: 'Crisis Zone', author: 'Hanselmann' })
                                ])
                                    .then(([card1, card2]) =>
                                        logic.retrieveCards(user.id)
                                            .then(cards => {
                                                expect(cards).to.have.lengthOf(2);
                                                const card1b = cards.find(card => card.image === card1.image);
                                                expect(card1b.name).to.equal(card1.name);
                                                expect(card1b.author).to.equal(card1.author);
                                                expect(card1b.owner.toString()).to.equal(user._id.toString()); // Corregido: Convertir ObjectId a cadena de caracteres
                                                const card2b = cards.find(card => card.image === card2.image);
                                                expect(card2b.name).to.equal(card2.name);
                                                expect(card2b.author).to.equal(card2.author);
                                                expect(card2b.owner.toString()).to.equal(user._id.toString()); // Corregido: Convertir ObjectId a cadena de caracteres
                                            })
                                    )
                            )
    
                    )
            )
    )
    


    after(() => mongoose.disconnect())
})

