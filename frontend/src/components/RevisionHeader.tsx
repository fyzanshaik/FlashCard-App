import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { Home } from 'lucide-react';
import { motion } from 'framer-motion';

export const RevisionHeader = () => {
	const navigate = useNavigate();
	const handleClick = () => {
		navigate('/dashboard');
	};

	return (
		<motion.div initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.5 }} className="bg-gray-900 text-white p-6 shadow-lg">
			<div className="container mx-auto flex justify-between items-center">
				<motion.h1
					className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-purple-600"
					initial={{ scale: 0.9 }}
					animate={{ scale: 1 }}
					transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
				>
					FLASHCARDS
				</motion.h1>
				<Button variant="outline" onClick={handleClick} className="text-white border-gray-400 bg-black hover:bg-slate-700 hover:text-white transition-all duration-300 transform hover:scale-105">
					<Home className="h-5 w-5 mr-2" />
					HOME
				</Button>
			</div>
		</motion.div>
	);
};
