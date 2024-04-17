import express from 'express'
import logic from './logic/index.ts'

const api = express()

const jsonBodyParser = express.json()

api.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*')
    res.setHeader('Access-Control-Allow-Methods', '*')
    res.setHeader('Access-Control-Allow-Headers', '*')

    next()
})

api.post('/users', jsonBodyParser, (req, res) => {
    try {
        const { name, birthdate, email, username, password } = req.body

        logic.registerUser(name, birthdate, email, username, password, error => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.status(201).send()
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.post('/users/auth', jsonBodyParser, (req, res) => {
    try {
        const { username, password } = req.body

        logic.loginUser(username, password, (error, userId) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(userId)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/users/:userId', (req, res) => {
    try {
        const { userId } = req.params

        logic.retrieveUser(userId, (error, user) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(user)
        })
    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

api.get('/posts', (req, res) => {
    try {
        const { authorization: userId } = req.headers

        logic.retrievePosts(userId, (error, posts) => {
            if (error) {
                res.status(400).json({ error: error.constructor.name, message: error.message })

                return
            }

            res.json(posts)
        })

    } catch (error) {
        res.status(400).json({ error: error.constructor.name, message: error.message })
    }
})

// ...

api.listen(8080, () => console.log('API listening on port 8080'))