import React from 'react'
import logic from '../logic'

import { useContext } from '../context'

function Popup({ book, onClose }) {
    return (
        <div className="popup">
            <div className="popup-content">
                <button className="close-button" onClick={onClose}>X</button>
                <h2>{book.name}</h2>
                <p>Author: {book.author}</p>
                <p>Description: {book.image}</p>

            </div>
        </div>


    )
}

export default Popup
