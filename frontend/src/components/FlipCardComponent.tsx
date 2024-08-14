import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface FlipCardProps {
	title: string;
	answer: string;
	initiallyFlipped?: boolean;
	onFlip?: (isFlipped: boolean) => void;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, answer, initiallyFlipped = false, onFlip }) => {
	const [isFlipped, setIsFlipped] = useState(initiallyFlipped);

	useEffect(() => {
		setIsFlipped(initiallyFlipped);
	}, [title, answer, initiallyFlipped]);

	const handleFlip = () => {
		setIsFlipped((prev) => {
			const newState = !prev;
			onFlip?.(newState);
			return newState;
		});
	};

	const handleKeyPress = (event: React.KeyboardEvent) => {
		if (event.key === 'Enter' || event.key === ' ') {
			handleFlip();
		}
	};

	return (
		<motion.div className="flip-card w-full h-full md:w-[350px] md:h-[400px] rounded-lg" whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
			<div
				className="flip-card-inner relative w-full h-full"
				role="button"
				tabIndex={0}
				onClick={handleFlip}
				onKeyPress={handleKeyPress}
				aria-pressed={isFlipped}
				aria-label={`Flip card. Current side: ${isFlipped ? 'Answer' : 'Question'}`}
			>
				<AnimatePresence initial={false} mode="wait">
					{!isFlipped ? <CardSide key="front" className="bg-black text-white" content={title} /> : <CardSide key="back" className="bg-white text-black" content={answer} />}
				</AnimatePresence>
			</div>
		</motion.div>
	);
};

interface CardSideProps {
	className: string;
	content: string;
}

const CardSide: React.FC<CardSideProps> = ({ className, content }) => (
	<motion.div
		className={`absolute w-full h-full rounded-lg shadow-lg flex items-center justify-center p-4 ${className}`}
		initial={{ rotateY: 90 }}
		animate={{ rotateY: 0 }}
		exit={{ rotateY: -90 }}
		transition={{ duration: 0.3 }}
	>
		<h1 className="text-lg md:text-2xl font-bold text-center">{content}</h1>
	</motion.div>
);

export default FlipCard;
