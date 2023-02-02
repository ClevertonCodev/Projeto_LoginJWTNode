import { NextFunction, Request, Response } from 'express'
import jwt from 'jsonwebtoken'
import { prisma } from '../prisma';
import { JwtPayload } from '../@types/Jwt';

export const authMiddleware = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		
		const { authorization } = req.headers
	
		if (!authorization) {
			return res.status(401).json({ error: 'Não Autorizado' });
		}
	
		const token = authorization.split(' ')[1]
	
		const { id } = jwt.verify(token, process.env.JWT_PASS) as JwtPayload
	
		const user = await prisma.user.findUnique({ where: { id } });
	
		if (!user) {
			return res.status(401).json({ error: 'Não Autorizado' });
		}
		 
		req.user= user;
	
		next()
	} catch (error) {

		return res.status(401).json({ error: 'Token na listra negra!' });
	}
}