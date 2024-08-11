import React, { useEffect, useState } from 'react';
import Flashcard from './FlashCard';
import { getFlashcards } from '../services/api';

type Flashcard = {
  id: number;
  question: string;
  answer: string;
};

const FlashcardList: React.FC = () => {
  const [flashcards, setFlashcards] = useState<Flashcard[]>([]);

  useEffect(() => {
    const fetchFlashcards = async () => {
      const response = await getFlashcards();
      setFlashcards(response);
    };

    fetchFlashcards();
  }, []);

  return (
    <div className="flashcard-list">
      {flashcards.map((flashcard) => (
        <Flashcard key={flashcard.id} question={flashcard.question} answer={flashcard.answer} />
      ))}
    </div>
  );
};

export default FlashcardList;
