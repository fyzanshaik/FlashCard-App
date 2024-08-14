import { Request, Response, NextFunction } from 'express';
import { verify } from 'jsonwebtoken';
import { AuthenticatedRequest } from '../utils/types';

export const authMiddleware = (req: AuthenticatedRequest, res: Response, next: NextFunction) => {
	const authHeader = req.headers.authorization;
	// console.log(authHeader);
	if (!authHeader) {
		req.token = 'No token';
		return next();
	}

	const token = authHeader;

	try {
		const decoded = verify(token, process.env.JWT_SECRET!) as { userId: number; iat: number; exp: number };
		// console.log('decoded: ', decoded);

		const userObj = {
			userId: decoded.userId,
			iat: decoded.iat,
			exp: decoded.exp,
		};

		req.user = userObj;
		req.token = token;

		next();
	} catch (error) {
		return res.status(401).json({ error: 'Token is not valid' });
	}
};
