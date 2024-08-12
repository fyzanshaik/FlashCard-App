import express, { Request, Response, Router } from 'express';
const router: Router = express.Router();

router.get('/', (req: Request, res: Response) => {
	console.log('Hello World was hit!');
	res.json({ message: 'hello world' });
});

export default router;
