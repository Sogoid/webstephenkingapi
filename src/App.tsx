import React, {useEffect, useState} from 'react';
import axios from 'axios';
import {ActivityIndicator} from "./components/components.tsx"; // você pode definir ou importar componentes web correspondentes
import {motion} from 'framer-motion'; // Usando framer-motion

export interface Root {
    data: Daum[];
}

export interface Daum {
    id: number;
    Year: number;
    Title: string;
    handle: string;
    Publisher: string;
    ISBN: string;
    Pages: number;
    Notes: string[];
    created_at: string;
    villains: Villain[];
}

export interface Villain {
    name: string;
    url: string;
}

const API_URL = 'https://stephen-king-api.onrender.com/api';

const fetchBooksList = async (): Promise<Daum[]> => {
    try {
        const response = await axios.get<Root>(`${API_URL}/books`);
        console.log('Dados da API: ', response.data.data); // Debug: Verifica os dados recebidos
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar livros: ', error);
        throw error;
    }
};

const App: React.FC = () => {
    const [isSearchFocused, setIsSearchFocused] = useState(false);
    const [searchValue, setSearchValue] = useState('');
    const [bookList, setBookList] = useState<Daum[]>([]);
    const [filteredBooks, setFilteredBooks] = useState<Daum[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchType, setSearchType] = useState<'title' | 'publisher'>('title');

    const loadBooks = async () => {
        try {
            setLoading(true); // Certifique-se de que o indicador de carregamento seja ativado
            const data = await fetchBooksList();
            setBookList(data);
            setFilteredBooks(data); // Inicialmente, todos os livros são mostrados
        } catch (error) {
            console.error(error);
        } finally {
            setLoading(false); // Desativar indicador de carregamento ao final
        }
    };

    useEffect(() => {
        const fetchData = async () => {
            try {
                await loadBooks();  // Aqui a promessa é resolvida
            } catch (error) {
                console.error('Erro ao carregar os livros: ', error);
            }
        };

        fetchData();  // Chama a função async, mas não retorna a promessa para o React
    }, []);  // Certifique-se de que o array de dependências está vazio


    useEffect(() => {
        const filtered = bookList.filter(book => {
            if (searchType === 'title') {
                return book.Title.toLowerCase().includes(searchValue.toLowerCase());
            } else {
                return book.Publisher.toLowerCase().includes(searchValue.toLowerCase());
            }
        });
        setFilteredBooks(filtered);
    }, [searchValue, searchType, bookList]);

    return (
        <div>
            <header style={styles.header}>
                <h1 style={styles.text}>Coleção Stephen King</h1>
                <img
                    style={styles.tinyLogo}
                    src="/src/assets/img/desenholivro.png" // Atualizar para um caminho de imagem válido
                    alt="Logo"
                />
            </header>
            <div style={styles.searchContainer}>
                <div style={styles.searchRow}>
                    <motion.div
                        animate={{scale: isSearchFocused || searchValue ? 1 : 0}}
                        transition={{duration: 0.2, ease: 'linear'}}
                    >
                        Search...
                    </motion.div>

                    <input
                        style={{
                            ...styles.input,
                            ...(isSearchFocused || searchValue ? styles.focus : {}),
                        }}
                        value={searchValue}
                        onChange={(e) => setSearchValue(e.target.value)}
                        onFocus={() => setIsSearchFocused(true)}
                        onBlur={() => setIsSearchFocused(false)}
                    />
                    <select
                        value={searchType}
                        style={styles.picker}
                        onChange={(e) => setSearchType(e.target.value as 'title' | 'publisher')}
                    >
                        <option value="title">TITULO</option>
                        <option value="publisher">EDITORA</option>
                    </select>
                </div>
                <hr style={styles.separator}/>
                <BookList books={filteredBooks} loading={loading}/>
            </div>
        </div>
    );
};

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

export interface BookListProps {
    books: Daum[];
    loading: boolean;
}

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

const styles: { [key: string]: React.CSSProperties } = {
    header: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        // flexDirection: 'row',
        margin: '16px 0',
        marginBottom: '48px',
        gap: '10px',
    },
    text: {
        fontFamily: 'WendyOne-Regular',
        fontSize: '50px',
        color: 'white',
        textTransform: 'uppercase',
        textAlign: 'center',
    },
    tinyLogo: {
        width: '40px',
        height: '40px',
    },
    searchContainer: {
        padding: '0 16px',
    },
    searchRow: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: '16px',
        gap: '6px', // Usar gap em vez de margin individual para espaçamento em layouts flexíveis
    },
    input: {
        flex: 1,
        height: '40px',
        borderColor: '#ccc',
        borderWidth: '1px',
        padding: '0 8px',
        backgroundColor: '#D9D9D9',
        borderRadius: '30px',
        color: 'black',
    },
    focus: {
        borderColor: 'blue',
    },
    picker: {
        width: '130px',
        backgroundColor: '#D9D9D9',
        color: 'black',
    },
    separator: {
        margin: '8px 0',
        borderBottom: '1px solid #737373',
    },
    container: {
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        gap: '16px',

    },
    row: {
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    noResults: {
        fontSize: '18px',
        color: 'red',
        textAlign: 'center',
        marginTop: '20px',
    },
    card: {
        width: '300px',
        backgroundColor: '#fff',
        borderRadius: '10px',
        padding: '6px 8px',
        marginTop: '8px',
        margin: '1px 5px',
        boxShadow: '0 2px 5px rgba(0, 0, 0, 0.2)',
        marginBottom: '16px',
    },
    title: {
        fontFamily: 'WendyOne-Regular',
        fontSize: '24px',
        color: 'black',
        flexWrap: 'wrap',
        textAlign: 'center',
    },
    publisher: {
        fontSize: '16px',
        color: 'gray',
    },
    isbn: {
        fontSize: '16px',
        color: 'gray',
    },
    pages: {
        fontSize: '16px',
        color: 'gray',
    },
};

export default App;
