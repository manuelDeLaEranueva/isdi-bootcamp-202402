import React from 'react'
import logic from '../logic'

function Popup({ book, onClose, onActionCompleted, context }) {
    const handleActionClick = () => {
        if (context === 'addCard') {
            logic.createCard(book.id)
                .then(() => {
                    onActionCompleted()
                    onClose()
                })
                .catch(error => {
                    console.error('Error creating card:', error)
                })
        } else if (context === 'addToBookshelf') {
            logic.addToBookshelf(book.id)
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
            <div className="popup-content bg-white p-6 rounded-lg relative">
                <h2 className="text-xl font-semibold mb-6">{book.name}</h2>
                <p className="text-gray-600 mb-6">Author: {book.author}</p>
                <div className="flex justify-between mt-6">
                    <button onClick={handleActionClick} className="bg-[#000568] hover:bg-blue-700 text-white font-semibold py-2 px-4 rounded mr-4">
                        {context === 'addCard' ? 'Create Card' : 'Add to Bookshelf'}
                    </button>
                    <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                        Cancel
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Popup
