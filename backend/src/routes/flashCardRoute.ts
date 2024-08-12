import express, { Router } from 'express';
import { addFlashCard, deleteCard, editCard, getAllCards } from '../controllers/flashCardController';
const router: Router = express.Router();

router.get('/get-flash-cards', getAllCards);
router.post('/add-flash-card', addFlashCard);

router.put('/edit-flash-card/:id', editCard);

router.delete('/delete-flash-card/:id', deleteCard);

export default router;
