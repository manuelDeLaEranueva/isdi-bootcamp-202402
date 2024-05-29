import React from 'react';
import { useContext } from '../context';

function UserBookList({ bookselves, editMode, onDeleteBook }) {
    const { showConfirm } = useContext();

    const handleDeleteClick = (bookId) => {
        showConfirm('delete book from bookshelf?', (confirmed) => {
            if (confirmed) {
                onDeleteBook(bookId);
            }
        });
    };

    return (
        <section>
            {bookselves.map((bookself, index) => (
                <React.Fragment key={bookself._id}>
                    <article className="p-4 flex items-center justify-between">
                        <div>
                            <h3 className="font-bold text-[#000568]">{bookself.book.name}</h3>
                            <p className="text-gray-600">{bookself.book.author}</p>
                        </div>
                        {editMode && (
                            <button
                                onClick={() => handleDeleteClick(bookself.book._id)}
                                className="hover:bg-red-600 text-white font-semibold py-1 px-2 rounded"
                            >
                                <img src="../../public/bin.png" className="w-6 h-6" alt="delete" />
                            </button>
                        )}
                    </article>
                    {index < bookselves.length - 1 && <hr className="border-gray-300 my-2" />}
                </React.Fragment>
            ))}
        </section>
    );
}

export default UserBookList;
