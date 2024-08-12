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
const AdminDashboard = () => {
	const [flashCards, setFlashCards] = useState<CardsList[]>([]);
	const [loading, setLoading] = useState(false);
	const handleAddFlashCard = (newCard: CardsList) => {
		console.log(newCard);
		axios
			.post('http://localhost:8080/add-flash-card', newCard)
			.then(() => {
				setLoading(true);
			})
			.catch((err) => console.log(err));
	};

	const handleEditFlashCard = (updatedCard: CardsList, id: number) => {
		// console.log(updatedCard, id);
		axios
			.put(`http://localhost:8080/edit-flash-card/${id}`, updatedCard)
			.then(() => {
				setLoading(true);
			})
			.catch((err) => console.log(err));
	};

	const handleDeleteFlashCard = (id: number) => {
		axios
			.delete(`http://localhost:8080/delete-flash-card/${id}`)
			.then(() => {
				setLoading(true);
			})
			.catch((err) => console.log(err));
	};

	useEffect(() => {
		setLoading(true);
		axios.get<CardsList[]>('http://localhost:8080/get-flash-cards').then((response) => {
			// console.log(response.data);
			setFlashCards(response.data);
			setLoading(false);
		});
	}, [loading]);

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
