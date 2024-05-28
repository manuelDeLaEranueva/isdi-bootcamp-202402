import React, { useState, useEffect } from 'react'
import logic from '../logic'

function BookList({ onBookSelect }) {
    const [searchedBooks, setSearchedBooks] = useState([])
    const [books, setBooks] = useState([])
    const [query, setQuery] = useState('')

    useEffect(() => {
        logic.retrieveBooks()
            .then(books => {
                setBooks(books)
            })
            .catch(error => console.error(error))
    }, [])

    const handleSelectedBook = (event, book) => {
        event.preventDefault()
        onBookSelect(book)
    }

    const handleSearch = event => {
        const letter = event.target.value
        setQuery(letter)
        if (letter) {
            const searched = books.filter(book =>
                book.name.toLowerCase().includes(letter.toLowerCase())
            )
            setSearchedBooks(searched)
        } else {
            setSearchedBooks([])
        }
    }

    return (
        <div className="mt-4">
            <input
                type='text'
                value={query}
                placeholder='Write title or author'
                onChange={handleSearch}
                className="px-4 py-2 border rounded-md pr-10 w-full"
            />
            <ul className="mt-4 max-h-96 overflow-y-auto">
                {searchedBooks.map(book => (
                    <li key={book._id} className="py-2">
                        <button onClick={(event) => handleSelectedBook(event, book)} className="text-black font-semibold hover:underline">
                            {book.name}
                        </button>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default BookList
