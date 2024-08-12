import React, { useState, useEffect } from 'react';
import '../../public/flip-card.css';

interface FlipCardProps {
	title: string;
	answer: string;
	isFrontVisible: boolean;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, answer }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	useEffect(() => {
		// Reset the flip state when the card changes
		setIsFlipped(false);
	}, [title, answer]);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className={`flip-card w-[350px] h-[400px] rounded-lg cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
			<div className="flip-card-inner">
				<div className="flip-card-front flex items-center justify-center">
					<div className="w-full h-full bg-black p-4 rounded-lg shadow-lg flex items-center justify-center">
						<h1 className="text-2xl font-bold text-white">{title}</h1>
					</div>
				</div>
				<div className="flip-card-back flex items-center justify-center">
					<div className="w-full h-full bg-white p-4 rounded-lg shadow-sm flex items-center justify-center">
						<h1 className="text-2xl font-bold text-black">{answer}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
