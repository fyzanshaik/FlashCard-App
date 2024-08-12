import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { HomeIcon } from '@radix-ui/react-icons'; // Assuming you're using Radix icons

export const RevisionHeader = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/dashboard');
	};

	return (
		<div className="bg-gray-900 text-white p-4 shadow-md">
			<div className="container mx-auto flex justify-between items-center">
				<h1 className="text-4xl font-bold text-pink-500">FLASHCARDS</h1>
				<Button variant="outline" onClick={handleClick} className="text-slate-300 border-gray-400 bg-black transition duration-300">
					<HomeIcon className="h-4 w-4 mr-2" />
					HOME
				</Button>
			</div>
		</div>
	);
};
