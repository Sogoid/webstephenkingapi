import React from "react";
import { Daum } from "../models/book";
import { ActivityIndicator } from "./ActivityIndicator";
import BookCard from "./BookCard";

interface BookListProps {
  books: Daum[];
  loading: boolean;
}

const BookList: React.FC<BookListProps> = ({ books, loading }) => {
  return (
    <div className="flex flex-col items-center">
      {loading ? (
        <div className="flex flex-row items-center mt-2">
          <span className="text-black font-bold uppercase italic mr-2">
            Loading...
          </span>
          <ActivityIndicator size="40px" color="red" />
        </div>
      ) : books.length === 0 ? (
        <p className="text-red-500">Nenhum livro encontrado</p>
      ) : (
        <div className="flex justify-center items-center flex-wrap gap-4 mt-10">
          {books.map((book) => (
            <BookCard
              key={book.id}
              id={book.id}
              title={book.Title}
              publisher={book.Publisher}
              isbn={book.ISBN}
              pages={book.Pages}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default BookList;
