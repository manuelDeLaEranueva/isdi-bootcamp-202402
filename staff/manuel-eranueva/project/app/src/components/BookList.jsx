import React, { useState, useEffect } from 'react'
import logic from '../logic'

function BookList({ actualBook }) {
    const [searchedBooks, setSearchedBooks] = useState([])
    const [books, setBooks] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        logic.retrieveBooks()
            .then(books => {
                setBooks(books)
                setSearchedBooks(books)
            })
            .catch(error => console.log(error))
    }, [])

    const handleSelectedBook = book => {
        console.log(book)
        actualBook(book)
    }

    const handleSearch = event => {
        const letter = event.target.value
        setQuery(letter)
        if (!letter) {
            setSearchedBooks(books)
        } else {
            const searched = books.filter(book =>
                book.name.toLowerCase().includes(letter.toLowerCase())
            )
            setSearchedBooks(searched)
        }
    }

    return (
        <div>
            <input
                type='text'
                value={query}
                placeholder='Write title or author'
                onChange={handleSearch}
                className="px-4 py-2 border rounded-md pr-10"
            />
            <ul>
                {searchedBooks.map(book => (
                    <li key={book._id}>
                        <a href="#" onClick={() => handleSelectedBook(book)} className="text-black font-semibold">
                            {book.name}
                        </a>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList
