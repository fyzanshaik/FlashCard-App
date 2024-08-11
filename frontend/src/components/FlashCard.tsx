import React, { useState } from 'react';

type FlashcardProps = {
	question: string;
	answer: string;
};

const Flashcard: React.FC<FlashcardProps> = ({ question, answer }) => {
	const [isFlipped, setIsFlipped] = useState(false);

	const handleFlip = () => {
		setIsFlipped(!isFlipped);
	};

	return (
		<div onClick={handleFlip} className="flashcard">
			{isFlipped ? <p>{answer}</p> : <p>{question}</p>}
		</div>
	);
};

export default Flashcard;
