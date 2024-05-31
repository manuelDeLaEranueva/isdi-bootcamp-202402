import { logger } from '../utils'
import { Link } from 'react-router-dom'
import logic from '../logic'
import { useContext } from '../context'

function UserBook({ item: bookself }) {
    console.log(bookself)
    logger.debug('UserBook > render')

    if (!bookself) {
        console.log('no bookselfs')
        return null
    }

    return (
        <article className="bg-white p-4 rounded shadow-md mb-4">
            <h3 className="text-lg font-bold text-gray-800">{bookself.owner && bookself.owner.username}</h3>
            <img src={bookself.image} alt="Book" className="w-full h-auto mt-2 rounded" />
            <p className="text-gray-600 mt-2">{bookself.book.name && bookself.book.author}</p>
        </article>
    )
}

export default UserBook