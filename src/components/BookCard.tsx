import React, { useEffect, useState } from "react";
import { BookDetail } from "../models/book";
import { fetchBookDetails } from "../services/bookService";
import BookModalDetails from "./BookModalDetails";

interface BookCardProps {
  title: string;
  publisher: string;
  isbn: string;
  pages: number;
  id: number;
}

const BookCard: React.FC<BookCardProps> = ({
  title,
  publisher,
  isbn,
  pages,
  id,
}) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [bookDetails, setBookDetails] = useState<BookDetail | null>(null);

  const handleInfoClick = async () => {
    try {
      const details = await fetchBookDetails(id);

      setBookDetails(details);
      setIsModalOpen(true);
    } catch (error) {
      console.error("Failed to fetch book details: ", error);
    }
  };

  useEffect(() => {}, [isModalOpen, bookDetails]);

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
          type="button"
          className="mt-4 px-4 py-2 bg-zinc-900 text-white rounded hover:bg-red-700 w-24"
          onClick={handleInfoClick}>
          Info
        </button>
      </div>
      {isModalOpen && bookDetails && (
        <BookModalDetails
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
          bookDetails={bookDetails}
        />
      )}
    </div>
  );
};

export default BookCard;
