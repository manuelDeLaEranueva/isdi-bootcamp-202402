import React, { useState, useEffect } from 'react'
import logic from '../logic'

function BookList({ books, onSelectedBook }) {
    const [searchedBooks, setSearchedBooks] = useState([]);

    const handleSearch = (letter) => {
        const searched = books.filter(book =>
            book.name.toLowerCase().includes(letter.toLowerCase())
        );
        setSearchedBooks(searched);
    };

    return (
        <div>
            {/* ... search input and other elements ... */}
            <ul>
                {searchedBooks.length > 0 ? (
                    searchedBooks.map(book => (
                        <li key={book._id}>
                            <a href="#" onClick={() => onSelectedBook(book)} className="text-black font-semibold">
                                {book.name}
                            </a>
                        </li>
                    ))
                ) : (
                    books.map(book => (
                        <li key={book._id}>
                            <a href="#" onClick={() => onSelectedBook(book)} className="text-white font-semibold">
                                {book.name}
                            </a>
                        </li>
                    ))
                )}
            </ul>
        </div>
    );
}

export default BookList;