import React from 'react'

function Popup({ book, onClose, onCreateCard }) {
    const handleCreateCardClick = () => {
        onCreateCard(book);
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
