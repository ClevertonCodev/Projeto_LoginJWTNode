import { Request, Response } from 'express'
import { prisma } from '../prisma';
import bcrypt from 'bcrypt'
import jwt  from 'jsonwebtoken';

export default {

    async login(req: Request, res: Response){
        try {
            const {email, password} = req.body
    
            let user = await prisma.user.findUnique({ where: { email: email } });
    
            if (!user) {
                    return res.status(400).json({ error: 'E-mail inválido' });
            }
    
            const check_in = await bcrypt.compare(password, user.password);
    
            if(!check_in){
                return res.status(400).json({ error: 'Senha inválida' });
            }
    
            const token =  jwt.sign({ id: user.id}, process.env.JWT_Pass, { expiresIn: '2h',    
            });
            
            return res.status(200).json({ token: token });
            
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },

    async me(req: Request, res: Response){
        try {
        return res.json(req.user)    
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },
}