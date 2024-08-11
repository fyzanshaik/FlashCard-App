import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';

const app = express();
const prisma = new PrismaClient();
app.use(express.json());

// Flashcard schema validation with Zod
const flashcardSchema = z.object({
	question: z.string(),
	answer: z.string(),
});

// Endpoints
app.get('/flashcards', async (req, res) => {
	const flashcards = await prisma.flashcard.findMany();
	res.json(flashcards);
});

app.post('/flashcards', async (req, res) => {
	try {
		const validatedData = flashcardSchema.parse(req.body);
		const flashcard = await prisma.flashcard.create({
			data: validatedData,
		});
		res.json(flashcard);
	} catch (error) {
		res.status(400).json({ error: '' });
	}
});

app.put('/flashcards/:id', async (req, res) => {
	try {
		const validatedData = flashcardSchema.parse(req.body);
		const { id } = req.params;
		const flashcard = await prisma.flashcard.update({
			where: { id: Number(id) },
			data: validatedData,
		});
		res.json(flashcard);
	} catch (error) {
		res.status(400).json({ error: '' });
	}
});

app.delete('/flashcards/:id', async (req, res) => {
	const { id } = req.params;
	await prisma.flashcard.delete({
		where: { id: Number(id) },
	});
	res.sendStatus(204);
});

// Start the server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
