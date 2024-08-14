import express, { Router } from 'express';
import { signup, login } from '../controllers/authController';

const router: Router = express.Router();

router.post('/signup', signup);
router.post('/login', login);

export default router;
