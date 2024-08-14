import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import { PrismaClient } from '@prisma/client';
import { sign } from 'jsonwebtoken';
import { userSignUpSchema, userLoginSchema } from '../zod-type';
import { AuthenticatedRequest } from '../utils/types';
import { hash } from 'crypto';

const prisma = new PrismaClient();

export const signup = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { username, password, firstname, lastname } = userSignUpSchema.parse(req.body);
		console.log(username, password, firstname, lastname);
		const hashedPassword = await bcrypt.hash(password, 10);
		console.log(hashedPassword);
		const user = await prisma.user.create({
			data: {
				firstName: firstname,
				lastName: lastname,
				username,
				password: hashedPassword,
			},
		});
		console.log(user);
		const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
		res.json({ token });
	} catch (error) {
		res.status(400).json({ error });
	}
};

export const login = async (req: AuthenticatedRequest, res: Response) => {
	try {
		const { username, password } = userLoginSchema.parse(req.body);
		console.log(username, password);
		const user = await prisma.user.findUnique({ where: { username } });

		if (user && (await bcrypt.compare(password, user.password))) {
			const token = sign({ userId: user.id }, process.env.JWT_SECRET!, { expiresIn: '1h' });
			res.json({ token });
		} else {
			res.status(401).json({ error: 'Invalid credentials' });
		}
	} catch (error) {
		res.status(400).json({ error: 'Invalid data' });
	}
};
