import { Card, CardType } from '../data/index.ts'
import { errors } from 'com'

const { SystemError } = errors

function retrieveCards(): Promise<CardType[]> {
    return Card.find()
        .populate('book')
        .populate('owner')
        .exec()
        .catch(error => { throw new SystemError(error.message) })
}

export default retrieveCards
