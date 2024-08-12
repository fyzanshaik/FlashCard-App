import express from 'express';
import cors from 'cors';
import flashCardRoute from './routes/flashCardRoute';
import helloWorld from './routes/helloWorld';
const app = express();
app.use(express.json());

const corsOptions = {
	origin: 'https://flash-card-app-xi.vercel.app/',
	methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
	credentials: true,
};

app.use(cors(corsOptions));
const PORT = process.env.PORT || 3000;

app.use('/', helloWorld);

app.use('/api', flashCardRoute);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
