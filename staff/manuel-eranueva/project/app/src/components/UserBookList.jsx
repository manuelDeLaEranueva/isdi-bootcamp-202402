import React from 'react'
import { useContext } from '../context'

function UserBookList({ bookselves, editMode, onDeleteBook }) {
    const { showConfirm } = useContext()

    const handleDeleteClick = (bookId) => {
        showConfirm('delete book from bookshelf?', (confirmed) => {
            if (confirmed) {
                onDeleteBook(bookId)
            }
        })
    }

    return (
        <section>
            {bookselves.map(bookself => (
                <article key={bookself._id} className="p-4 border rounded shadow-md flex items-center justify-between">
                    <div>
                        <h3 className="font-bold">{bookself.book.name}</h3>
                        <p className="text-gray-600">{bookself.book.author}</p>
                    </div>
                    {editMode && (
                        <button
                            onClick={() => handleDeleteClick(bookself.book._id)} // Asegúrate de pasar el `book._id`
                            className="bg-red-500 hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                        >
                            🗑️
                        </button>
                    )}
                </article>
            ))}
        </section>
    )
}

export default UserBookList
