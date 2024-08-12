import { useEffect, useState } from 'react';
import { AdminHeader } from './AdminHeader';
import axios from 'axios';
import ListItem from './ListItem';
import { Skeleton } from '@/components/ui/skeleton';

interface CardsList {
	id: number;
	Title: string;
	Answer: string;
}
interface FormValues {
	Title: string;
	Answer: string;
}
const AdminDashboard = () => {
	// const localURL = import.meta.env.VITE_LOCALURL;
	const API_URL = import.meta.env.VITE_VERCEL;
	// console.log(API_URL);
	const [flashCards, setFlashCards] = useState<CardsList[]>([]);
	const [stateChange, setStateChange] = useState(false);
	const [loading, setLoading] = useState(false);
	const handleAddFlashCard = async (newCard: FormValues) => {
		try {
			setLoading(true);
			console.log(newCard);
			const cardWithId: CardsList = { ...newCard, id: Date.now() };
			await axios.post(`${API_URL}/add-flash-card`, cardWithId);
			setStateChange(true);
			// setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleEditFlashCard = async (updatedCard: FormValues, id: number) => {
		try {
			setLoading(true);
			const cardWithId: CardsList = { ...updatedCard, id };
			await axios.put(`${API_URL}/edit-flash-card/${id}`, cardWithId);
			setStateChange(true);
			// setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	const handleDeleteFlashCard = async (id: number) => {
		try {
			setLoading(true);
			await axios.delete(`${API_URL}/delete-flash-card/${id}`);
			setStateChange(true);

			// setLoading(false);
		} catch (err) {
			console.log(err);
		}
	};

	useEffect(() => {
		setLoading(true);
		const getFlashCards = async () => {
			const response = await axios.get<CardsList[]>(`${API_URL}/get-flash-cards`);
			setFlashCards(response.data);
			setLoading(false);
		};
		getFlashCards();
	}, [API_URL, stateChange]);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<AdminHeader data={flashCards} onAddFlashCard={handleAddFlashCard} />
			<div className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-4">All Flash Cards</h2>
				{loading ? (
					<div className="flex flex-col space-y-3">
						<Skeleton className="h-[125px] w-[250px] rounded-xl" />
						<div className="space-y-2">
							<Skeleton className="h-4 w-[250px]" />
							<Skeleton className="h-4 w-[200px]" />
						</div>
					</div>
				) : (
					<div className="space-y-4">
						{flashCards.map((item, id) => (
							<ListItem key={id} id={item.id} title={item.Title} value={item.Answer} onEditFlashCard={handleEditFlashCard} onDeleteFlashCard={handleDeleteFlashCard} />
						))}
					</div>
				)}
			</div>
		</div>
	);
};

export default AdminDashboard;
