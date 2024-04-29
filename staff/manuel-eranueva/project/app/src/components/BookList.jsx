import React, { useState, useEffect } from 'react'
import logic from '../logic'

function BookList({ selectedBook }) {
    const [books, setBooks] = useState([])
    const [searchedBooks, setSearchedBooks] = useState([])

    useEffect(() => {
        try {
            logic.retrieveBooks()
                .then(setBooks)
                .catch(error => console.log(error))
        } catch (error) {
            console.log(error)
        }
    }, [])

    const handleSelectedBook = (book) => {
        selectedBook(book)
    }

    const handleSearch = (letter) => {
        const searched = books.filter(book =>
            book.title.includes(letter)
        )
        setSearchedBooks(searched)
    }

    return (
        <div>
            <input
                type='text'
                placeholder='search book!'
                onChange={element => handleSearch(element.target.value)}
            />
            <div className="absolute top-0 right-0 mt-2 mr-2">
                <img src="../../public/search.png" alt="Search" style={{ width: '16px', height: '16px' }} />
            </div>
            <ul>
                {searchedBooks.length > 0 ? (
                    searchedBooks.map(book => (
                        <li key={book._id}>
                            <a href="#" onClick={() => handleSelectedBook(book)} className="text-white font-semibold">
                                {book.title}
                            </a>
                        </li>
                    ))
                ) : (
                    books.map(book => (
                        <li key={book._id}>
                            <a href="#" onClick={() => handleSelectedBook(book)} className="text-white font-semibold">
                                {book.title}
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    )
}

export default BookList
