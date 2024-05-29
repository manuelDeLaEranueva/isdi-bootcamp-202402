import React from 'react'
import logic from '../logic'

function Popup({ book, onClose, onActionCompleted, context }) {
    const handleActionClick = () => {
        if (context === 'addCard') {
            logic.createCard(book._id)
                .then(() => {
                    onActionCompleted()
                    onClose()
                })
                .catch(error => {
                    console.error('Error creating card:', error)
                })
        } else if (context === 'addToBookshelf') {
            logic.addToBookshelf(book._id)
                .then(() => {
                    onActionCompleted()
                    onClose()
                })
                .catch(error => {
                    console.error('Error adding book to bookshelf:', error)
                })
        }
    }

    const handleCancelClick = () => {
        onClose()
    }

    return (
        <div className="popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50 z-50">
            <div className="popup-content bg-white p-8 rounded-lg relative">
                <span className="close absolute top-4 right-4 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-xl font-semibold">{book.name}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <div className="flex justify-between mt-4">
                    <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button onClick={handleActionClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        {context === 'addCard' ? 'Create Card' : 'Add to Bookshelf'}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Popup
