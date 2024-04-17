import Collection from './Collection.mjs'

describe('Collection', () => {
    describe('constructor', () => {
        it('creates a collection', () => {
            const cars = new Collection('cars')

            expect(cars).toBeInstanceOf(Collection)
        })
    })

    describe('> helpers', () => {
        describe('_generateId', () => {
            it('generates a random id', () => {
                const cars = new Collection('cars')

                const id1 = cars._generateId()

                expect(typeof id1).toBe('string')

                const id2 = cars._generateId()

                expect(typeof id2).toBe('string')

                expect(id1 === id2).toBe(false)
            })
        })

        describe('_loadDocuments', () => {
            it('loads empty array on new collection', () => {
                delete localStorage.cars

                const cars = new Collection('cars')

                const documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(0)
            })

            it('loads data on non-empty collection', () => {
                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                const cars = new Collection('cars')

                const documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(2)

                let document = documents[0]
                expect(document).toBeInstanceOf(Object)
                expect(document.brand).toBe('porsche')
                expect(document.model).toBe('911')

                document = documents[1]
                expect(document.brand).toBe('fiat')
                expect(document.model).toBe('500')
            })
        })

        describe('_saveDocuments', () => {
            it('saves a collection', () => {
                delete localStorage.cars

                const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

                const cars = new Collection('cars')

                cars._saveDocuments(documents)

                //expect(!!localStorage.cars).toBe(true)
                expect(typeof localStorage.cars).toBe('string')

                const documentsJSON = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                expect(localStorage.cars).toBe(documentsJSON)
            })

            it('fails on non-array documents', () => {
                const documents = 'hola documents'

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('documents is not an array')
            })

            it('fails on array with non-object document in documents', () => {
                const documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('a document in documents is not an object')
            })
        })

        describe('_backup', () => {
            it('backs up the collection json', () => {
                delete localStorage['cars-backup']

                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                const cars = new Collection('cars')

                cars._backup()

                expect(localStorage['cars-backup']).toBe(localStorage.cars)
            })
        })

        describe('_restore', () => {
            it('restores the collection json', () => {
                delete localStorage['cars']

                localStorage['cars-backup'] = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                const cars = new Collection('cars')

                cars._restore()

                expect(localStorage.cars).toBe(localStorage['cars-backup'])
            })
        })
    })

    describe('> CRUD', () => {
        describe('findOne', () => {
            it('should find an existing document', () => {
                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                const cars = new Collection('cars')

                const car = cars.findOne(function (car) { return car.brand === 'fiat' })

                expect(car).toBeInstanceOf(Object)
                expect(car.brand).toBe('fiat')
                expect(car.model).toBe('500')
            })

            it('should fail on no callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })

            it('should fail on non-function callback', () => {
                const cars = new Collection('cars')

                let errorThrown

                try {
                    cars.findOne(123)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })
        })

        // TODO test all methods
    })
})