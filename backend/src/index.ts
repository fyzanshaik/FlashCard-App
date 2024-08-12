import express from 'express';
import cors from 'cors';
import flashCardRoute from './routes/flashCardRoute';
import helloWorld from './routes/helloWorld';
const app = express();
app.use(express.json());
app.use(cors());
const PORT = process.env.PORT || 3000;

app.use('/', helloWorld);

app.use('/api', flashCardRoute);

app.listen(PORT, () => {
	console.log(`Server is running on http://localhost:${PORT}`);
});

export default app;
