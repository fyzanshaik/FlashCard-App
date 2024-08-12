import { z } from 'zod';
export const flashcardSchema = z.object({
	Title: z.string(),
	Answer: z.string(),
});
