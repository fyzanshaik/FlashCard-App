import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

export const RevisionHeader = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/dashboard');
	};
	return (
		<>
			<div className="flex justify-between items-center col-span-2 bg-mirage  p-4">
				<div className="text-4xl font-bold text-gray-300">Flash Cards</div>
				<Button variant="outline" onClick={handleClick} className="ml-5">
					Home
				</Button>
			</div>
		</>
	);
};
