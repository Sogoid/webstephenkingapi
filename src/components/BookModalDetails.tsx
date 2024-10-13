import React from "react";
import { BookDetail } from "../models/book";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  bookDetails: BookDetail | null;
}

const BookModalDetails: React.FC<ModalProps> = ({
  isOpen,
  onClose,
  bookDetails,
}) => {
  if (!isOpen || !bookDetails) return null; 

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg w-96 relative">
        <button onClick={onClose} className="absolute top-2 right-2">
          X
        </button>
        <h2 className="text-2xl font-bold mb-4">{bookDetails.Title}</h2>
        <p>Publisher: {bookDetails.Publisher}</p>
        <p>ISBN: {bookDetails.ISBN}</p>
        <p>Pages: {bookDetails.Pages}</p>
        <p>Year: {bookDetails.Year}</p>
        <h3 className="mt-4 font-semibold">Notes:</h3>
        <ul className="list-disc pl-5">
          {bookDetails.Notes.map((note, index) => (
            <li key={index}>{note}</li>
          ))}
        </ul>
        <h3 className="mt-4 font-semibold">Villains:</h3>
        <ul className="list-disc pl-5">
          {bookDetails.villains.map((villain, index) => (
            <li key={index}>{villain.name}</li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BookModalDetails;
