import React, { useState, useEffect, useCallback, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import FlipCard from './FlipCardComponent';
import { RevisionHeader } from './RevisionHeader';
import { ChevronRightIcon, ChevronLeftIcon } from '@radix-ui/react-icons';
import { Button } from '../components/ui/button';
import { useLocation } from 'react-router-dom';
import { useToast } from '../components/ui/use-toast';

interface CardsList {
	id: number;
	title: string;
	answer: string;
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
		<motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} className="min-h-screen bg-gray-900 text-white">
			<RevisionHeader />
			<div className="container mx-auto px-4 py-4">
				<motion.div initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }} className="bg-gray-800 rounded-lg p-4 md:p-8 lg:p-12">
					<div className="flex flex-col md:flex-row justify-between items-center mb-4">
						<motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm mb-2 md:mb-0">
							CARDS: {currentIndex + 1}/{totalCards}
						</motion.div>
						<motion.div initial={{ x: 20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.4 }} className="text-sm">
							TIMER: {formatTime(timer)}
						</motion.div>
					</div>
					<div className="flex flex-col md:flex-row items-center justify-between">
						<Button variant="outline" size="icon" onClick={handlePrev} className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white mb-4 md:mb-0">
							<ChevronLeftIcon className="h-4 w-4" />
						</Button>
						<AnimatePresence mode="wait">
							<motion.div
								key={cardKey}
								initial={{ opacity: 0, scale: 0.8 }}
								animate={{ opacity: 1, scale: 1 }}
								exit={{ opacity: 0, scale: 0.8 }}
								transition={{ duration: 0.3 }}
								className="w-full md:w-64 h-64 bg-gray-700 rounded-lg flex items-center justify-center mb-4 md:mb-0"
							>
								<FlipCard title={shuffledArray[currentIndex].title} answer={shuffledArray[currentIndex].answer} />
							</motion.div>
						</AnimatePresence>
						<Button variant="outline" size="icon" onClick={handleNext} className="text-white border-gray-400 bg-black hover:bg-slate-600 hover:text-white">
							<ChevronRightIcon className="h-4 w-4" />
						</Button>
					</div>
				</motion.div>
			</div>
		</motion.div>
	);
};
