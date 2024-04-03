const express = require('express')
const fs = require('fs')

const server = express()

const jsonBodyParser = express.json()

// ex: GET http://localhost:8080/cars/all
// curl http://localhost:8080/cars/all

server.get('/cars/all', (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const cars = JSON.parse(json)

        res.json(cars)
    })
})

// ex: GET http://localhost:8080/cars/123
// curl http://localhost:8080/cars/123

server.get('/cars/:carId', (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const cars = JSON.parse(json)

        const { carId } = req.params

        const car = cars.find(car => car.id === carId)

        if (!car) {
            res.status(404).json(null)

            return
        }

        res.json(car)
    })
})

// ex: GET http://localhost:8080/cars?q=fi
// curl 'http://localhost:8080/cars?q=fi'

server.get('/cars', (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const cars = JSON.parse(json)

        const { q } = req.query

        const filteredCars = cars.filter(car => car.brand.includes(q) || car.model.includes(q))

        res.json(filteredCars)
    })
})

// ex: POST {"brand":"renault","model":"laguna"} http://localhost:8080/cars
// curl -X POST -H "Content-Type: application/json" -d '{"brand":"renault","model":"laguna"}' http://localhost:8080/cars -v

server.post('/cars', jsonBodyParser, (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const cars = JSON.parse(json)

        //const { brand, model } = req.body
        //const car = { brand, model }
        const car = req.body

        car.id = Date.now().toString()

        cars.push(car)

        const json2 = JSON.stringify(cars)

        fs.writeFile('./cars.json', json2, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    })
})

// ex: PATCH {"model":"clio"} http://localhost:8080/cars/1712131387680
// curl -X PATCH -H "Content-Type: application/json" -d '{"model":"clio"}' http://localhost:8080/cars/1712131387680 -v
// curl -X PATCH -H "Content-Type: application/json" -d '{"brand":"chevrolet","model":"camaro"}' http://localhost:8080/cars/1712131387680 -v

server.patch('/cars/:carId', jsonBodyParser, (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const { carId } = req.params

        const cars = JSON.parse(json)

        const { brand, model } = req.body

        const car = cars.find(car => car.id === carId)

        if (!car) {
            res.status(404).send()

            return
        }

        if (brand) car.brand = brand
        if (model) car.model = model

        const json2 = JSON.stringify(cars)

        fs.writeFile('./cars.json', json2, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    })
})

// ex: PUT {"brand":"chevrolet","model":"camaro"} http://localhost:8080/cars/1712131387680
// curl -X PUT -H "Content-Type: application/json" -d '{"brand":"chevrolet","model":"camaro"}' http://localhost:8080/cars/1712131387680 -v

server.put('/cars/:carId', jsonBodyParser, (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const { carId } = req.params

        const cars = JSON.parse(json)

        const { brand, model } = req.body

        const car = cars.find(car => car.id === carId)

        if (!car) {
            res.status(404).send()

            return
        }

        car.brand = brand
        car.model = model

        const json2 = JSON.stringify(cars)

        fs.writeFile('./cars.json', json2, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    })
})

// ex: DELETE http://localhost:8080/cars/1712131387680
// curl -X DELETE http://localhost:8080/cars/1712131387680 -v

server.delete('/cars/:carId', (req, res) => {
    fs.readFile('./cars.json', 'utf8', (error, json) => {
        if (error) {
            res.status(500).json({ error: error.constructor.name, message: error.message })

            return
        }

        const { carId } = req.params

        const cars = JSON.parse(json)

        const carIndex = cars.findIndex(car => car.id === carId)

        if (carIndex < 0) {
            res.status(404).send()

            return
        }

        cars.splice(carIndex, 1)

        const json2 = JSON.stringify(cars)

        fs.writeFile('./cars.json', json2, error => {
            if (error) {
                res.status(500).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(204).send()
        })
    })
})

server.listen(8080, () => console.log('server listening on port 8080'))