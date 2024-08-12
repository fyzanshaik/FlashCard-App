import express from 'express';
import { PrismaClient } from '@prisma/client';
import { z } from 'zod';
import cors from 'cors';
import flashCardRoute from './routes/flashCardRoute';

const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/', flashCardRoute);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});
