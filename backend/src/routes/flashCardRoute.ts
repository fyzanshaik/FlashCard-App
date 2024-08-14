import express, { Router } from 'express';
import { addFlashCard, deleteCard, editCard, getAllCards } from '../controllers/flashCardController';
import { authMiddleware } from '../middlewares/authMiddleware';

const router: Router = express.Router();

router.get('/get-flash-cards', authMiddleware, getAllCards);
router.post('/add-flash-card', authMiddleware, addFlashCard);
router.put('/edit-flash-card/:id', authMiddleware, editCard);
router.delete('/delete-flash-card/:id', authMiddleware, deleteCard);

export default router;
