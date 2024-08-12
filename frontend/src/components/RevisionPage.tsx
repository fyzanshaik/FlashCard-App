import React, { useState, useEffect, useCallback, useMemo } from 'react';
import FlipCard from './FlipCardComponent';
import { RevisionHeader } from './RevisionHeader';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

interface CardsList {
	id: number;
	Title: string;
	Answer: string;
}
function shuffleArray(array: CardsList[]): CardsList[] {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1));
		[array[i], array[j]] = [array[j], array[i]];
	}
	return array;
}
export const RevisionPage: React.FC = () => {
	const location = useLocation();
	const flashCards: CardsList[] = location.state;
	const [currentIndex, setCurrentIndex] = useState(0);
	const [cardKey, setCardKey] = useState(0);
	const totalCards = flashCards.length;
	const [timer, setTimer] = useState(0);
	const { toast } = useToast();
	console.log('revisoon');
	const shuffledArray = useMemo(() => {
		return shuffleArray(flashCards);
	}, [flashCards]);

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

	const handleNext = useCallback(() => {
		if (currentIndex + 1 >= totalCards) {
			toast({ description: "You're at the last card!" });
		} else {
			setCurrentIndex((prevIndex) => prevIndex + 1);
			setCardKey((prevKey) => prevKey + 1);
		}
	}, [currentIndex, totalCards, toast]);

	const handlePrev = useCallback(() => {
		if (currentIndex - 1 < 0) {
			toast({ description: "You're at the first card!" });
		} else {
			setCurrentIndex((prevIndex) => prevIndex - 1);
			setCardKey((prevKey) => prevKey + 1);
		}
	}, [currentIndex, toast]);

	return (
		<div className="min-h-screen bg-gray-900 text-white">
			<RevisionHeader />
			<div className="container mx-auto px-4 py-4">
				<div className="bg-gray-800 rounded-lg p-20">
					<div className="flex justify-between items-center mb-4">
						<div className="text-sm">
							CARDS: {currentIndex + 1}/{totalCards}
						</div>
						<div className="text-sm">TIMER: {formatTime(timer)}</div>
					</div>
					<div className="flex items-center justify-between">
						<Button variant="outline" size="icon" onClick={handlePrev} className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<div className="w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center">
							<FlipCard key={cardKey} title={shuffledArray[currentIndex].Title} answer={shuffledArray[currentIndex].Answer} isFrontVisible={true} />
						</div>
						<Button variant="outline" size="icon" onClick={handleNext} className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</div>
			</div>
		</div>
	);
};
