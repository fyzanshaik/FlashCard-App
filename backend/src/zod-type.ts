import { z } from 'zod';

export const flashcardSchema = z.object({
	title: z.string(),
	answer: z.string(),
});

export const userLoginSchema = z.object({
	username: z.string(),
	password: z.string(),
});

export const userSignUpSchema = z.object({
	firstname: z.string(),
	lastname: z.string(),
	username: z.string(),
	password: z.string(),
});

export const userFlashCardSchema = z.object({
	id: z.number(),
	title: z.string(),
	answer: z.string(),
});
