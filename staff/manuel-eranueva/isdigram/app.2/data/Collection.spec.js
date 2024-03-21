describe('Collection', function () {
    describe('constructor', function () {
        it('creates a collection', function () {
            var cars = new Collection('cars')

            expect(cars).toBeInstanceOf(Collection)
        })
    })

    describe('> helpers', function () {
        describe('_generateId', function () {
            it('generates a random id', function () {
                var cars = new Collection('cars')

                var id1 = cars._generateId()

                expect(typeof id1).toBe('string')

                var id2 = cars._generateId()

                expect(typeof id2).toBe('string')

                expect(id1 === id2).toBe(false)
            })
        })

        describe('_loadDocuments', function () {
            it('loads empty array on new collection', function () {
                delete localStorage.cars

                var cars = new Collection('cars')

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(0)
            })

            it('loads data on non-empty collection', function () {
                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                var cars = new Collection('cars')

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(2)

                var document = documents[0]
                expect(document).toBeInstanceOf(Object)
                expect(document.brand).toBe('porsche')
                expect(document.model).toBe('911')

                var document = documents[1]
                expect(document.brand).toBe('fiat')
                expect(document.model).toBe('500')
            })
        })

        describe('_saveDocuments', function () {
            it('saves a collection', function () {
                delete localStorage.cars

                var documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }]

                var cars = new Collection('cars')

                cars._saveDocuments(documents)

                //expect(!!localStorage.cars).toBe(true)
                expect(typeof localStorage.cars).toBe('string')

                var documentsJSON = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                expect(localStorage.cars).toBe(documentsJSON)
            })

            it('fails on non-array documents', function () {
                var documents = 'hola documents'

                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('documents is not an array')
            })

            it('fails on array with non-object document in documents', function () {
                var documents = [{ brand: 'porsche', model: '911' }, { brand: 'fiat', model: '500' }, 'hola document']

                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars._saveDocuments(documents)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('a document in documents is not an object')
            })
        })

        describe('_backup', function () {
            it('backs up the collection json', function () {
                delete localStorage['cars-backup']

                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                var cars = new Collection('cars')

                cars._backup()

                expect(localStorage['cars-backup']).toBe(localStorage.cars)
            })
        })

        describe('_restore', function () {
            it('restores the collection json', function () {
                delete localStorage['cars']

                localStorage['cars-backup'] = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                var cars = new Collection('cars')

                cars._restore()

                expect(localStorage.cars).toBe(localStorage['cars-backup'])
            })
        })
    })

    describe('> CRUD', function () {
        describe('findOne', function () {
            it('should find an existing document', function () {
                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                var cars = new Collection('cars')

                var car = cars.findOne(function (car) { return car.brand === 'fiat' })

                expect(car).toBeInstanceOf(Object)
                expect(car.brand).toBe('fiat')
                expect(car.model).toBe('500')
            })

            it('should fail on no callback', function () {
                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars.findOne()
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('callback is not a function')
            })

            it('should fail on non-function callback', function () {
                var cars = new Collection('cars')

                var errorThrown

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

    describe('> CRUD', function () {
        describe('insertOne', function () {
            it('should find an existing document', function () {
                localStorage.cars = '[{"brand":"porsche","model":"911"},{"brand":"fiat","model":"500"}]'

                var cars = new Collection('cars')


                var car = cars.insertOne({ brand: 'fiat', model: 'jeje' })

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(3)

                var document = documents[0]
                expect(document).toBeInstanceOf(Object)
                expect(document.brand).toBe('porsche')
                expect(document.model).toBe('911')
            })

            it('should fail on non-object', function () {
                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars.insertOne(true)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('a document in documents is not an object')

            })
        })
    })

    describe('> CRUD', function () {
        describe('updateOne', function () {
            it('should find an existing document', function () {
                localStorage.cars = '[{"brand":"porsche","model":"911","id":1},{"brand":"fiat","model":"500","id":2}]'

                var cars = new Collection('cars')

                var car = cars.updateOne({ brand: 'perla', model: 'jeje', id: 2 })

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(2)

                var document = documents[1]
                expect(document).toBeInstanceOf(Object)
                expect(document.brand).toBe('perla')
                expect(document.model).toBe('jeje')
            })

            it('should fail on non-object', function () {
                var cars = new Collection('cars')

                var errorThrown

                try {
                    cars.insertOne(true)
                } catch (error) {
                    errorThrown = error
                }

                expect(errorThrown).toBeInstanceOf(TypeError)
                expect(errorThrown.message).toBe('a document in documents is not an object')

            })
        })
    })

    describe('> CRUD', function () {
        describe('deleteOne', function () {
            it('should find an existing document', function () {
                localStorage.cars = '[{"brand":"porsche","model":"911","id":1},{"brand":"perla","model":"jeje","id":2}]'

                var cars = new Collection('cars')

                var car = cars.deleteOne({ brand: 'perla', model: 'jeje', id: 2 })

                var documents = cars._loadDocuments()

                expect(documents).toBeInstanceOf(Array)
                expect(documents.length).toBe(2)

                var document = documents[1]
                expect(document).toBeInstanceOf(Object)
                expect(document.brand).toBe('perla')
                expect(document.model).toBe('jeje')
            })
        })
    })

})
