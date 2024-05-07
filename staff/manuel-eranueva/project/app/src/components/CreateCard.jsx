import React from 'react';
import RoundButton from './library/RoundButton';
import logic from '../logic';
import { useContext } from '../context';

function CreateCard({ book, user, onCardCreated }) {
    const { showFeedback } = useContext();

    const handleSubmit = event => {
        event.preventDefault();

        try {
            logic.createCard(user.id, book.id)
                .then(() => {
                    onCardCreated();
                })
                .catch(error => showFeedback(error, 'error'));
        } catch (error) {
            showFeedback(error);
        }
    };

    return (
        <section className="mb-[50px] fixed bottom-0 left-0 bg-white w-full box-border p-[5vw]">
            <form onSubmit={handleSubmit} className="flex flex-col ">
                <RoundButton type="submit">Create</RoundButton>
            </form>
        </section>
    );
}

export default CreateCard;