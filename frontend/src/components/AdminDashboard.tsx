import { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import ListItem from './ListItem';

interface CardsList {
	Title: string;
	Answer: string;
}

const AdminDashboard = () => {
	const [flashCards, setFlashCards] = useState<CardsList[]>([]);

	const handleAddFlashCard = (newCard: CardsList) => {
		setFlashCards([...flashCards, newCard]);
	};
	const handleEditFlashCard = (newCard: CardsList) => {
		setFlashCards([...flashCards, newCard]);
	};
	return (
		<>
			<AdminHeader onAddFlashCard={handleAddFlashCard} />
			<div className="">All Flash Cards: </div>
			<div>
				{flashCards.map((item, id) => (
					<ListItem key={id} title={item.Title} value={item.Answer} onEditFlashCard={handleEditFlashCard} />
				))}
			</div>
		</>
	);
};

export default AdminDashboard;
