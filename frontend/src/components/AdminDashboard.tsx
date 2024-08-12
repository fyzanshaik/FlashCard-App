import { useState } from 'react';
import { AdminHeader } from './AdminHeader';
import ListItem from './ListItem';

interface CardsList {
	Title: string;
	Answer: string;
}
const fakeFlashCards: CardsList[] = [
	{ Title: 'What is React?', Answer: 'A JavaScript library for building user interfaces.' },
	{ Title: 'What is TypeScript?', Answer: 'A typed superset of JavaScript that compiles to plain JavaScript.' },
	{ Title: 'Explain useState in React.', Answer: 'useState is a Hook that lets you add state to functional components.' },
	{ Title: 'What is an interface in TypeScript?', Answer: 'An interface defines the shape of an object, describing its structure.' },
	{ Title: "What does the 'map' function do in JavaScript?", Answer: "The 'map' function creates a new array by applying a function to each element of an existing array." },
	{ Title: 'What is a component in React?', Answer: 'A component is a reusable piece of UI that can manage its own state and props.' },
	{ Title: 'What is Tailwind CSS?', Answer: 'A utility-first CSS framework for rapidly building custom designs.' },
	{ Title: 'What is the purpose of useEffect in React?', Answer: 'useEffect lets you perform side effects in function components.' },
	{ Title: 'What is Prisma?', Answer: 'Prisma is an open-source ORM for Node.js and TypeScript that helps developers build faster and type-safe database access.' },
	{ Title: 'What is the difference between Props and State in React?', Answer: 'Props are used to pass data from parent to child components, while state is local data managed within a component.' },
];
const AdminDashboard = () => {
	const [flashCards, setFlashCards] = useState<CardsList[]>(fakeFlashCards);

	const handleAddFlashCard = (newCard: CardsList) => {
		setFlashCards([...flashCards, newCard]);
	};

	const handleEditFlashCard = (index: number, updatedCard: CardsList) => {
		const updatedCards = [...flashCards];
		updatedCards[index] = updatedCard;
		setFlashCards(updatedCards);
	};

	const handleDeleteFlashCard = (index: number) => {
		const updatedCards = flashCards.filter((_, i) => i !== index);
		setFlashCards(updatedCards);
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<AdminHeader onAddFlashCard={handleAddFlashCard} />
			<div className="container mx-auto px-4 py-8">
				<h2 className="text-2xl font-bold mb-4">All Flash Cards</h2>
				<div className="space-y-4">
					{flashCards.map((item, id) => (
						<ListItem
							key={id}
							title={item.Title}
							value={item.Answer}
							onEditFlashCard={(updatedCard) => handleEditFlashCard(id, updatedCard)}
							onDeleteFlashCard={() => handleDeleteFlashCard(id)}
						/>
					))}
				</div>
			</div>
		</div>
	);
};

export default AdminDashboard;
