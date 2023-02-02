import {Request, Response} from 'express'
import {prisma} from '../prisma';
import bcrypt from 'bcrypt'

export default {

    async create(req: Request , res: Response) {
        try {
             const {name, email, password, type, active } = req.body;
             
             if(type == "CLIENT"){
                 let user = await prisma.user.findUnique({where: {email: email}});
     
                 if (user) {
                     return res.status(400).json({error: 'Usuario já exite!'});
                 }
                 const hasPassword = await bcrypt.hash(password, 10);
                 user = await prisma.user.create({
                     data: {
                         name,
                         email,
                         active,
                         type,
                         password: hasPassword,
                     },
                 });
     
                 return res.status(201).json(user);

             }else{
                return res.status(401).json({ error: 'Você não tem autorização'});
             }
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },

    async createSuper (req: Request, res: Response){
        try {
            const superUser = req.user.type
            const {name, email, password, type, active } = req.body;
            
            if(type == "SUPER" && superUser == "SUPER" || type == "ADM" && superUser == "SUPER"){
               let user = await prisma.user.findUnique({where: {email: email}});
    
           if (user) {
               return res.status(400).json({error: 'Usuario já exite!'});
           }
           const hasPassword = await bcrypt.hash(password, 10);
           user = await prisma.user.create({
               data: {
                   name,
                   email,
                   active,
                   type,
                   password: hasPassword,
               },
           });
    
           return res.status(201).json(user);
               
            }else{
                return res.status(400).json({error: ' Você não pode cadastrar um cliente!'});
            }
            
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },

    async getAll(req: Request, res: Response) {
        try {
            const users = await prisma.user.findMany();
            return res.json(users);
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },


    async getOne(req: Request, res: Response) {

        try{
            const id = parseInt(req.params.id);

            const user = await prisma.user.findUnique({where: {id: id}});
            
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({message: ' Id do Usuário não localizado'});
            }
        }catch (error){
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },

    async update(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id);
            const {name, email, password, type, active } = req.body

            const hasPassword = await bcrypt.hash(password, 10);

            const user = await prisma.user.update({
                where: {id: id},
                data: {
                    name,
                    email,
                    active,
                    type,
                    password: hasPassword
                },
            });
            if (user) {
                res.status(200).json(user);
            } else {
                res.status(400).json({message: ' Id do Usuário não localizado'});
            }
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }
    },

    async delete(req: Request, res: Response) {
        try {
            const id = parseInt(req.params.id)

            const user = await prisma.user.delete({where: {id: id}})
            if (user) {
                res.status(200).json({message: 'Usuário excluido com sucesso!'});
            } else {
                res.status(400).json({message: ' Id do Usuário não localizado'});
            }
        } catch (error) {
            return res.status(400).json({error: ' Erro inesperado!'});
        }

    },

}




