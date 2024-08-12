import React, { useState } from 'react';

interface FlipCardProps {
	title: string;
	answer: string;
}

const FlipCard: React.FC<FlipCardProps> = ({ title, answer }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleClick = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div className={`flip-card w-[350px] h-[400px] rounded-lg cursor-pointer ${isFlipped ? 'flipped' : ''}`} onClick={handleClick}>
			<div className="flip-card-inner">
				<div className="flip-card-front flex items-center justify-center">
					<div className="w-full h-full bg-gray-300 p-4 rounded-lg shadow-lg flex items-center justify-center">
						<h1 className="text-2xl font-bold text-gray-800">{title}</h1>
					</div>
				</div>
				<div className="flip-card-back flex items-center justify-center">
					<div className="w-full h-full bg-gray-800 p-4 rounded-lg shadow-sm flex items-center justify-center">
						<h1 className="text-2xl font-bold text-white">{answer}</h1>
					</div>
				</div>
			</div>
		</div>
	);
};

export default FlipCard;
