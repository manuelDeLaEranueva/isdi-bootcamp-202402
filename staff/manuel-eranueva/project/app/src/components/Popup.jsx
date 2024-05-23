import React from 'react'
import logic from '../logic'

function Popup({ book, onClose }) {
    const handleCreateCardClick = () => {
        logic.createCard(book._id)
            .then(() => {
                onClose()
            })
            .catch(error => console.error('Error creating card:', error))
    }

    const handleCancelClick = () => {
        onClose()
    }

    return (
        <div className="popup fixed top-0 left-0 w-full h-full flex justify-center items-center bg-black bg-opacity-50">
            <div className="popup-content bg-white p-8 rounded-lg shadow-lg relative">
                <span className="close absolute top-4 right-4 text-2xl cursor-pointer" onClick={onClose}>&times;</span>
                <h2 className="text-xl font-semibold">{book.name}</h2>
                <p className="text-gray-600">Author: {book.author}</p>
                <p className="text-gray-600">Image: {book.image}</p>
                <div className="flex justify-between mt-4">
                    <button onClick={handleCancelClick} className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-semibold py-2 px-4 rounded">
                        Cancel
                    </button>
                    <button onClick={handleCreateCardClick} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded">
                        Create Card
                    </button>
                </div>
            </div>
        </div>
    )
}

export default Popup
