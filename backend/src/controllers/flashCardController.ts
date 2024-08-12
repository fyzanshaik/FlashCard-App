import express, { Request, Response } from 'express';
import { PrismaClient } from '@prisma/client';
import { flashcardSchema } from '../zod-type';

const prisma = new PrismaClient();
const fc = prisma.flashCard;

// Get all flashcards
export const getAllCards = async (req: Request, res: Response) => {
	console.log('Received request to get all flashcards');
	try {
		const flashcards = await fc.findMany({
			orderBy: {
				id: 'asc',
			},
		});
		console.log('Fetched flashcards:', flashcards);
		res.status(200).json(flashcards);
	} catch (error) {
		console.error('Error fetching flashcards:', error);
		res.status(500).json({ error: 'An error occurred while fetching flashcards.' });
	}
};

// Add a new flashcard
export const addFlashCard = async (req: Request, res: Response) => {
	console.log('Received request to add a flashcard with data:', req.body);
	try {
		const { Title, Answer } = req.body;
		console.log('Validating flashcard data');
		const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

		console.log('Validated flashcard data:', validatedFlashcard);
		const newFlashcard = await fc.create({
			data: validatedFlashcard,
		});
		console.log('Created new flashcard:', newFlashcard);
		res.status(201).json(newFlashcard);
	} catch (error) {
		console.error('Error adding flashcard:', error);
		res.status(500).json({ error: 'An error occurred while adding the flashcard.' });
	}
};

// Edit an existing flashcard
export const editCard = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Received request to edit flashcard with id: ${id}`);

	try {
		const { Title, Answer } = req.body;
		console.log('Validating updated flashcard data');
		const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

		console.log('Validated flashcard data:', validatedFlashcard);
		const updatedFlashcard = await fc.update({
			where: { id: Number(id) },
			data: validatedFlashcard,
		});
		console.log(`Updated flashcard with id ${id}:`, updatedFlashcard);
		res.status(200).json(updatedFlashcard);
	} catch (error) {
		console.error(`Error updating flashcard with id ${id}:`, error);
		res.status(500).json({ error: `An error occurred while updating the flashcard with id ${id}.` });
	}
};

// Delete a flashcard
export const deleteCard = async (req: Request, res: Response) => {
	const { id } = req.params;
	console.log(`Received request to delete flashcard with id: ${id}`);

	try {
		const deletedFlashcard = await fc.delete({
			where: { id: Number(id) },
		});
		console.log(`Deleted flashcard with id ${id}:`, deletedFlashcard);
		res.status(200).json(deletedFlashcard);
	} catch (error) {
		console.error(`Error deleting flashcard with id ${id}:`, error);
		res.status(500).json({ error: `An error occurred while deleting the flashcard with id ${id}.` });
	}
};
