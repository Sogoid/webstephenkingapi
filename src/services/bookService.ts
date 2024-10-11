import axios from 'axios';
import {Daum, Root} from '../models/book';

const API_URL = 'https://stephen-king-api.onrender.com/api';

export const fetchBooksList = async (): Promise<Daum[]> => {
    try {
        const response = await axios.get<Root>(`${API_URL}/books`);
        return response.data.data;
    } catch (error) {
        console.error('Erro ao buscar livros: ', error);
        throw error;
    }
};
