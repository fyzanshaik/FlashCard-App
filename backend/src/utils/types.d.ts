import { Request } from 'express';

export interface AuthenticatedRequest extends Request {
	user?: {
		userId: number;
		iat: number;
		exp: number;
	};
	token?: string;
}
