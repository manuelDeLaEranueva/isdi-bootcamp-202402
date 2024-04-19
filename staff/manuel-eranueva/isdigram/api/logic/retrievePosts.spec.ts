import mongoose from 'mongoose'
import logic from './index.ts'
import { expect } from 'chai'
import { errors } from 'com'

import { User, Post, PostType } from '../data/index.ts'

const { CredentialsError, NotFoundError } = errors

describe('retrievePosts', () => {
    before(() => mongoose.connect('mongodb://localhost:27017/test'))

    it('retrieves all posts for existing user', () =>
        Promise.all([
            User.deleteMany(),
            Post.deleteMany()
        ])
            .then(() =>
                User.create({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' })
                    .then(user =>
                        Promise.all([
                            Post.create({ author: user.id, image: 'http://images.com/1', text: 'hello post 1', date: new Date }),
                            Post.create({ author: user.id, image: 'http://images.com/2', text: 'hello post 2', date: new Date }),
                            Post.create({ author: user.id, image: 'http://images.com/3', text: 'hello post 3', date: new Date })
                        ])
                            .then(([post1, post2, post3]) =>
                                logic.retrievePosts(user.id)
                                    .then(posts => {
                                        expect(posts).to.have.lengthOf(3)

                                        const post1b = posts.find(post => post.id === post1.id)

                                        expect(post1b.author.username).to.equal('peperoni')
                                        expect(post1b.author.id).to.equal(user.id)
                                        expect(post1b.image).to.equal(post1.image)
                                        expect(post1b.text).to.equal(post1.text)
                                        expect(post1b.date).to.deep.equal(post1.date)

                                        const post2b = posts.find(post => post.id === post2.id)

                                        expect(post2b.author.username).to.equal('peperoni')
                                        expect(post2b.author.id).to.equal(user.id)
                                        expect(post2b.image).to.equal(post2.image)
                                        expect(post2b.text).to.equal(post2.text)
                                        expect(post2b.date).to.deep.equal(post2.date)

                                        const post3b = posts.find(post => post.id === post3.id)

                                        expect(post3b.author.username).to.equal('peperoni')
                                        expect(post3b.author.id).to.equal(user.id)
                                        expect(post3b.image).to.equal(post3.image)
                                        expect(post3b.text).to.deep.equal(post3.text)
                                        expect(post3b.date).to.be.instanceOf(Date)
                                    })
                            )
                    )
            )
    )

    //     it('fails orphan post', done => {
    //         db.users.deleteAll(error => {
    //             if (error) {
    //                 done(error)

    //                 return
    //             }

    //             db.posts.deleteAll(error => {
    //                 if (error) {
    //                     done(error)

    //                     return
    //                 }

    //                 db.users.insertOne({ name: 'Pepe Roni', birthdate: '2000-01-01', email: 'pepe@roni.com', username: 'peperoni', password: '123qwe123' }, (error, insertedUserId) => {
    //                     if (error) {
    //                         done(error)

    //                         return
    //                     }

    //                     const insertedPosts = []

    //                     let count = 1

    //                     const insertedPost1 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }

    //                     db.posts.insertOne(insertedPost1, (error, insertedPostId1) => {
    //                         if (error) {
    //                             done(error)

    //                             return
    //                         }

    //                         insertedPosts.push(insertedPost1)

    //                         count++

    //                         const insertedPost2 = { author: insertedUserId, image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }

    //                         db.posts.insertOne(insertedPost2, (error, insertedPostId2) => {
    //                             if (error) {
    //                                 done(error)

    //                                 return
    //                             }

    //                             insertedPosts.push(insertedPost2)

    //                             count++

    //                             const insertedPost3 = { author: 'unknown-user-id', image: `http://images.com/${count}`, text: `hello post ${count}`, date: new Date }

    //                             db.posts.insertOne(insertedPost3, (error, insertedPostId3) => {
    //                                 if (error) {
    //                                     done(error)

    //                                     return
    //                                 }

    //                                 insertedPosts.push(insertedPost3)

    //                                 logic.retrievePosts(insertedUserId, (error, posts) => {
    //                                     expect(error).to.be.instanceOf(Error)
    //                                     expect(error.message).to.equal('post owner not found')

    //                                     expect(posts).to.be.undefined

    //                                     done()
    //                                 })
    //                             })
    //                         })
    //                     })
    //                 })
    //             })
    //         })
    //     })
    // })

    // TODO test all methods

    after(mongoose.disconnect)
})