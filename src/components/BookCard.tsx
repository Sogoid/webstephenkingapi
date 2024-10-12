import React from 'react';

interface BookCardProps {
    title: string;
    publisher: string;
    isbn: string;
    pages: number;
}

const BookCard: React.FC<BookCardProps> = ({ title, publisher, isbn, pages }) => {
    return (
        <div className="flex flex-col justify-between bg-zinc-300 rounded-3xl hover:shadow-2xl hover:shadow-black shadow- p-8 border-2 border-zinc-900 gap-6 w-72 h-96">
            <h3 className="text-xl font-bold text-center">{title}</h3>
            <div className="flex-grow">
                <p className="text-gray-700">Publisher: {publisher}</p>
                <p className="text-gray-700">ISBN: {isbn}</p>
                <p className="text-gray-700">Pages: {pages}</p>
            </div>
            <div className="flex justify-center items-center mt-auto">
                <button
                    className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-red-700 w-24"
                    onClick={() => alert(`More info about ${title}`)}
                >
                    Info
                </button>
            </div>
        </div>
    );
};

export default BookCard;
