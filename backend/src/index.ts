// app.ts or server.ts
import express from 'express';
import cors from 'cors';
import flashCardRoute from './routes/flashCardRoute';
import authRoute from './routes/authRoute';
import helloWorld from './routes/helloWorld';
import { apiRateLimiter, authRateLimiter } from './rateLimiter';

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
const corsOptions = {
	origin: ['https://frontend-flash-61iiaohr4-fyzanshaiks-projects.vercel.app', 'https://frontend-flash-phi.vercel.app', 'http://localhost:5173/dashboard'],
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

app.use(cors(corsOptions));

app.use('/api', apiRateLimiter, flashCardRoute);
app.use('/api/auth', authRateLimiter, authRoute);
app.use('/', helloWorld);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
