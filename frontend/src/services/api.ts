import axios from 'axios';

const api = axios.create({
	baseURL: 'http://localhost:3000', // Backend URL
});

export const getFlashcards = () => api.get('/flashcards');
export const createFlashcard = (data: { question: string; answer: string }) => api.post('/flashcards', data);
export const updateFlashcard = (id: number, data: { question: string; answer: string }) => api.put(`/flashcards/${id}`, data);
export const deleteFlashcard = (id: number) => api.delete(`/flashcards/${id}`);
