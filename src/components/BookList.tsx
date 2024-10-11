import {BookListProps} from '../App.tsx';
import BookCard from './BookCard';
import {ActivityIndicator} from './ActivityIndicator';


const BookList: React.FC<BookListProps> = ({books, loading}) => {
    return (
        <div style={styles.container}>
            {loading ? (
                <ActivityIndicator size="large" color="red"/>
            ) : books.length === 0 ? (
                <p style={styles.noResults}>Nenhum livro encontrado</p>
            ) : (
                <div style={styles.row}>
                    {books.map((book) => (
                        <BookCard
                            key={book.id}
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

const styles = {
    container: { /* estilos aqui */},
    row: { /* estilos aqui */},
    noResults: { /* estilos aqui */}
};

export default BookList;
