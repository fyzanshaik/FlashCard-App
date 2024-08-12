import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { flashcardSchema } from '../zod-type';

const prisma = new PrismaClient();
const fc = prisma.flashCard;

// Get all flashcards
export const getAllCards = async (req: Request, res: Response) => {
	try {
		const flashcards = await fc.findMany({
			orderBy: {
				id: 'asc',
			},
		});
		res.status(200).json(flashcards);
	} catch (error) {
		console.error('Error fetching flashcards:', error);
		res.status(500).json({ error: 'An error occurred while fetching flashcards.' });
	}
};

// Add a new flashcard
export const addFlashCard = async (req: Request, res: Response) => {
	try {
		const { Title, Answer } = req.body;
		const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

		const newFlashcard = await fc.create({
			data: validatedFlashcard,
		});

		res.status(201).json(newFlashcard);
	} catch (error) {
		console.error('Error adding flashcard:', error);
		res.status(500).json({ error: 'An error occurred while adding the flashcard.' });
	}
};

// Edit an existing flashcard
export const editCard = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const { Title, Answer } = req.body;

		const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

		const updatedFlashcard = await fc.update({
			where: { id: Number(id) },
			data: validatedFlashcard,
		});

		res.status(200).json(updatedFlashcard);
	} catch (error) {
		console.error(`Error updating flashcard with id ${id}:`, error);
		res.status(500).json({ error: `An error occurred while updating the flashcard with id ${id}.` });
	}
};

// Delete a flashcard
export const deleteCard = async (req: Request, res: Response) => {
	const { id } = req.params;

	try {
		const deletedFlashcard = await fc.delete({
			where: { id: Number(id) },
		});

		res.status(200).json(deletedFlashcard);
	} catch (error) {
		console.error(`Error deleting flashcard with id ${id}:`, error);
		res.status(500).json({ error: `An error occurred while deleting the flashcard with id ${id}.` });
	}
};
