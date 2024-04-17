import { writeFile, readFile } from 'fs'

import Collection from './Collection'

import { expect } from 'chai'

describe('Collection', () => {
    describe('constructor', () => {
        it('creates a collection', () => {
            const cars = new Collection('cars')

            expect(cars).to.be.instanceOf(Collection)
        })
    })

    describe('> helpers', () => {
        describe('_generateId', () => {
            it('generates a random id', () => {
                const cars = new Collection('cars')

                const id1 = cars._generateId()

                expect(typeof id1).to.equal('string')

                const id2 = cars._generateId()

                expect(typeof id2).to.equal('string')

                expect(id1 === id2).to.equal(false)
            })
        })

        describe('_loadDocuments', () => {
            it('loads empty array on new collection', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(error).to.be.null

                        expect(documents).to.be.instanceOf(Array)
                        expect(documents.length).to.equal(0)

                        done()
                    })
                })
            })

            it('loads data on non-empty collection', done => {
                writeFile('./data/cars.json', '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars._loadDocuments((error, documents) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(error).to.be.null

                        expect(documents).to.be.instanceOf(Array)
                        expect(documents.length).to.equal(2)

                        let document = documents[0]
                        expect(document).to.be.instanceOf(Object)
                        expect(document.brand).to.equal('porsche')
                        expect(document.model).to.equal('911')

                        document = documents[1]
                        expect(document.brand).to.equal('fiat')
                        expect(document.model).to.equal('500')

                        done()
                    })
                })
            })
        })

        describe('_saveDocuments', () => {
            it('saves a collection', done => {
                writeFile('./data/cars.json', '[]', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

                    const cars = new Collection('cars')

                    cars._saveDocuments(documents, error => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(error).to.be.null

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            expect(documentsJSON).to.equal(JSON.stringify(documents))

                            done()
                        })
                    })

                })
            })

            it('fails on non-array documents', () => {
                const documents = 'hola documents'

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents, () => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('documents is not an array')
            })

            it('fails on array with non-object document in documents', () => {
                const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents, () => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('a document in documents is not an object')
            })
        })
    })

    describe('> CRUD', () => {
        describe('findOne', () => {
            it('finds an existing document', done => {
                writeFile('./data/cars.json', '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars.findOne(car => car.brand === 'fiat', (error, car) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(error).to.be.null

                        expect(car).to.be.instanceOf(Object)
                        expect(car.brand).to.equal('fiat')
                        expect(car.model).to.equal('500')

                        done()
                    })
                })
            })

            it('returns null on non-existing document', done => {
                writeFile('./data/cars.json', '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]', error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars.findOne(car => car.brand === 'peugeot', (error, car) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(error).to.be.null
                        expect(car).to.be.null

                        done()
                    })
                })
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })

            it('fails on non-function callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })
        })

        describe('insertOne', () => {
            it('insert one document', done => {
                const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    const document = { brand: 'peugeot', model: '504' }

                    cars.insertOne(document, (error, insertedId) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(insertedId).to.be.a.string

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            // documents.push(document)
                            // const documentsJsonToMatch = JSON.stringify(documents)
                            // expect(documentsJSON).to.equal(documentsJsonToMatch)

                            // or (better)

                            const documents = JSON.parse(documentsJSON)
                            expect(documents).to.have.lengthOf(3)
                            expect(documents[2]).to.deep.equal(document)

                            done()
                        })
                    })
                })
            })

            it('fails on no document', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.insertOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('document is not an object')
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.insertOne({})
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')
            })
        })

        describe('updateOne', () => {
            it('updates an existing document', done => {
                const documents = [{ id: '123', brand: 'porsche', model: '911' }, { id: '345', brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    const document = { id: '123', brand: 'porsche', model: 'panamera' }

                    cars.updateOne(car => car.id === '123', document, (error, updated) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(updated).to.be.true

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            const documents = JSON.parse(documentsJSON)
                            expect(documents).to.have.lengthOf(2)
                            expect(documents[0]).to.deep.equal(document)

                            done()
                        })
                    })
                })
            })

            it('does not update a non-existing document', done => {
                const documents = [{ id: '123', brand: 'porsche', model: '911' }, { id: '345', brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    const document = { id: '123', brand: 'porsche', model: 'panamera' }

                    cars.updateOne(car => car.id === '789', document, (error, updated) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(updated).to.be.false

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            const documents2 = JSON.parse(documentsJSON)
                            expect(documents2).to.deep.equal(documents)

                            done()
                        })
                    })
                })
            })

            it('fails on no condition callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.updateOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })

            it('fails on no document', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.updateOne(() => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('document is not an object')
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.updateOne(() => { }, {})
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')
            })
        })

        describe('deleteOne', () => {
            it('deletes and existing document', done => {
                const documents = [{ id: '123', brand: 'porsche', model: '911' }, { id: '345', brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars.deleteOne(car => car.id === '123', (error, deleted) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(deleted).to.be.true

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            const documents2 = JSON.parse(documentsJSON)
                            expect(documents2).to.have.lengthOf(1)
                            expect(documents2[0]).to.deep.equal(documents[1])

                            done()
                        })
                    })
                })
            })

            it('does not delete a non-existing document', done => {
                const documents = [{ id: '123', brand: 'porsche', model: '911' }, { id: '345', brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars.deleteOne(car => car.id === '789', (error, deleted) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(deleted).to.be.false

                        readFile('./data/cars.json', 'utf8', (error, documentsJSON) => {
                            if (error) {
                                done(error)

                                return
                            }

                            const documents2 = JSON.parse(documentsJSON)
                            expect(documents2).to.deep.equal(documents)

                            done()
                        })
                    })
                })
            })

            it('fails on no condition callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.deleteOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('condition callback is not a function')
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.deleteOne(() => { })
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')
            })
        })

        describe('getAll', () => {
            it('gets all documents', done => {
                const documents = [{ id: '123', brand: 'porsche', model: '911' }, { id: '345', brand: 'fiat', model: '500' }]
                const documentsJSON = JSON.stringify(documents)

                writeFile('./data/cars.json', documentsJSON, error => {
                    if (error) {
                        done(error)

                        return
                    }

                    const cars = new Collection('cars')

                    cars.getAll((error, documents2) => {
                        if (error) {
                            done(error)

                            return
                        }

                        expect(documents2).to.deep.equal(documents)

                        done()
                    })
                })
            })

            it('fails on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    //@ts-ignore
                    cars.getAll()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).to.be.instanceOf(TypeError)
                expect(errorThrown.message).to.equal('callback is not a function')
            })
        })
    })
})