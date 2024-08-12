import express, { Request, Response, Router } from 'express';
import { PrismaClient } from '@prisma/client';
import { flashcardSchema } from '../zod-type';

const prisma = new PrismaClient();
const fc = prisma.flashCard;

export const getAllCards = async (req: Request, res: Response) => {
	const flashcards = await fc.findMany({
		orderBy: {
			id: 'asc',
		},
	});
	res.json(flashcards);
};

export const addFlashCard = async (req: Request, res: Response) => {
	const { Title, Answer } = req.body;
	// console.log(typeof Title, typeof Answer);
	const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

	const newFlashcard = await fc.create({
		data: validatedFlashcard,
	});

	res.json(newFlashcard);
};

export const editCard = async (req: Request, res: Response) => {
	const { id } = req.params;
	const { Title, Answer } = req.body;

	const validatedFlashcard = flashcardSchema.parse({ Title, Answer });

	const updatedFlashcard = await fc.update({
		where: { id: Number(id) },
		data: validatedFlashcard,
	});

	res.json(updatedFlashcard);
};

export const deleteCard = async (req: Request, res: Response) => {
	const { id } = req.params;

	const deletedFlashcard = await fc.delete({
		where: { id: Number(id) },
	});

	res.json(deletedFlashcard);
};
