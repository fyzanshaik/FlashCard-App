import express, { Request, Response, Router } from 'express';
import { addFlashCard, deleteCard, editCard, getAllCards } from '../controllers/flashCardController';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
	res.json({ message: 'hello world' });
});

export default router;
