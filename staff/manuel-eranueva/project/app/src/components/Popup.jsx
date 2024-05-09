import React, { useState, useEffect } from 'react'
import logic from '../logic'


function Popup({ book, onClose }) {
    const handleCreateCardClick = () => {
        console.log('popup executing')
        logic.createCard(book._id);

    };

    return (
        <div className="popup">
            <div className="popup-content">
                <span className="close" onClick={onClose}>&times;</span>
                <h2>{book.name}</h2>
                <p>{book.author}</p>
                <p>{book.image}</p>
                <button onClick={handleCreateCardClick}>Create Card</button>
            </div>
        </div>
    );
}

export default Popup
