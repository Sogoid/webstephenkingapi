import React from 'react';

interface BookCardProps {
    title: string;
    publisher: string;
    isbn: string;
    pages: number;
}

const BookCard: React.FC<BookCardProps> = ({title, publisher, isbn, pages}) => {
    return (
        <div style={styles.card}>
            <h3 style={styles.title}>{title}</h3>
            <p style={styles.publisher}>Publisher: {publisher}</p>
            <p style={styles.isbn}>ISBN: {isbn}</p>
            <p style={styles.pages}>Pages: {pages}</p>
            <button onClick={() => alert(`More info about ${title}`)}>Info</button>
        </div>
    );
};

const styles = {
    card: { /* estilos aqui */},
    title: { /* estilos aqui */},
    publisher: { /* estilos aqui */},
    isbn: { /* estilos aqui */},
    pages: { /* estilos aqui */}
};

export default BookCard;
