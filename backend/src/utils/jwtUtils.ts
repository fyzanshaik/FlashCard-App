import { sign, verify } from 'jsonwebtoken';

export const createToken = (payload: object, secret: string, expiresIn: string) => {
	return sign(payload, secret, { expiresIn });
};

export const verifyToken = (token: string, secret: string) => {
	return verify(token, secret);
};
