import React, { useState } from 'react'
import logic from '../logic'

function CreateCard({ onCancelClick, onCardCreated }) {
    const [bookId, setBookId] = useState('')

    const handleSubmit = async (event) => {
        event.preventDefault()

        try {
            await logic.createCard(bookId)
            onCardCreated() // IMPORTANTE: aquí llamamos para actualizar la lista de tarjetas después de crear una!!!!
        } catch (error) {
            console.error('Error creating card:', error)
        }
    }

    return (
        <div>
            <h2>Create Card</h2>
            <form onSubmit={handleSubmit}>
                <label>
                    Book ID:
                    <input
                        type="text"
                        value={bookId}
                        onChange={(event) => setBookId(event.target.value)}
                    />
                </label>
                <button type="submit">Create</button>
                <button onClick={onCancelClick}>Cancel</button>
            </form>
        </div>
    )
}

export default CreateCard
