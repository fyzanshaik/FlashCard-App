import React, { useState, useEffect } from 'react';
import FlipCard from './FlipCardComponent';
import { RevisionHeader } from './RevisionHeader';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';

export const RevisionPage: React.FC = () => {
	const [currentIndex, setCurrentIndex] = useState(1);
	const totalCards = 10;
	const [timer, setTimer] = useState(0);

	useEffect(() => {
		const interval = setInterval(() => {
			setTimer((prevTimer) => prevTimer + 1);
		}, 1000);

		return () => clearInterval(interval);
	}, []);

	const formatTime = (time: number) => {
		const minutes = Math.floor(time / 60)
			.toString()
			.padStart(2, '0');
		const seconds = (time % 60).toString().padStart(2, '0');
		return `${minutes}:${seconds}`;
	};

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<RevisionHeader />
			<div className="container mx-auto px-4 py-4">
				{/* <h1 className="text-4xl font-bold mb-8 text-pink-500">FLASHCARDS</h1> */}
				<div className="bg-gray-800 rounded-lg p-20 ">
					<div className="flex justify-between items-center mb-4">
						<div className="text-sm">
							CARDS: {currentIndex}/{totalCards}
						</div>
						<div className="text-sm">TIMER: {formatTime(timer)}</div>
					</div>
					<div className="flex items-center justify-between">
						<Button
							variant="outline"
							size="icon"
							onClick={() => setCurrentIndex(Math.max(1, currentIndex - 1))}
							className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white"
						>
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
							<FlipCard title="DISPLAY QUESTION" answer="IF CLICKED FLIP AND REVEAL THE ANSWER" />
						</div>
						<Button
							variant="outline"
							size="icon"
							onClick={() => setCurrentIndex(Math.min(totalCards, currentIndex + 1))}
							className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white"
						>
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
