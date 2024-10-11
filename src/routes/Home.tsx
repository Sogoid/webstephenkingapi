// routes/Home.tsx
import React, {useEffect, useState} from 'react';
import {fetchBooksList} from '../services/bookService';
import Header from '../components/Header';
import SearchBar from '../components/SearchBar';
import BookList from '../components/BookList';
import {Daum} from '../models/book';

const Home: React.FC = () => {
    const [bookList, setBookList] = useState<Daum[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Daum[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchValue, setSearchValue] = useState('');
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchType, setSearchType] = useState<'title' | 'publisher'>('title');

    useEffect(() => {
        const loadBooks = async () => {
            setLoading(true);
            try {
                const books = await fetchBooksList();
                setBookList(books);
                setFilteredBooks(books);
            } catch (error) {
                console.error('Erro ao carregar livros:', error);
            } finally {
                setLoading(false);
            }
        };

        loadBooks();
    }, []);

    useEffect(() => {
        const filtered = bookList.filter((book) =>
            searchType === 'title'
                ? book.Title.toLowerCase().includes(searchValue.toLowerCase())
                : book.Publisher.toLowerCase().includes(searchValue.toLowerCase())
        );
        setFilteredBooks(filtered);
    }, [searchValue, searchType, bookList]);

    return (
        <div>
            <Header/>
            <SearchBar
                isSearchFocused={isSearchFocused}
                searchValue={searchValue}
                setSearchValue={setSearchValue}
                setIsSearchFocused={setIsSearchFocused}
                searchType={searchType}
                setSearchType={setSearchType}
            />
            <BookList books={filteredBooks} loading={loading}/>
        </div>
    );
};

export default Home;
