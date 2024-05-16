import { logger } from '../utils'
import { Link } from 'react-router-dom'
import logic from '../logic'
import { useContext } from '../context'

function UserBook({ item: bookself }) {

    console.log(bookself)


    logger.debug('UserBook > render')


    if (!bookself) {
        console.log('no bookselfs')
        return null;
    }

    return (
        <article>
            <h3>{bookself.owner && bookself.owner.username}</h3>
            <img src={bookself.image} />
            <p>{bookself.book && bookself.book.author}</p>

        </article>
    );
}

export default UserBook
