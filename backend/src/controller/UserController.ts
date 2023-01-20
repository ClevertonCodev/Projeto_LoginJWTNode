import { Request, Response } from 'express'
import { prisma } from '../prisma';
import bcrypt from 'bcrypt'

export default {

        async create(req: Request, res: Response) {
        try { const { name, email, password } = req.body;

              let user = await prisma.user.findUnique({ where: { email: email } });

              if (user) {
                return res.status(400).json({ error: 'Usuario já exite!' })
                }
              const hasPassword = await bcrypt.hash(password, 10)

              user = await prisma.user.create({
                            data: {
                              name,
                              email,
                              password:hasPassword
                            },
                          });
                    
                          return res.status(201).json(user)
                        } catch (error) {
                          return res.status(404).json({ error: 'Erro inesperado!' })
                        }
                
        },

        async getAll(req: Request, res: Response) {
                const users = await prisma.user.findMany();
                return res.json(users);

        },


        async getOne(req: Request, res: Response) {
                const id = parseInt(req.params.id)

                const user = await prisma.user.findUnique({ where: { id: id } })

                if (user) {
                        res.status(200).json(user);
                } else {
                        res.status(400).json({ message: ' Id do Usuário não localizado' })
                }
        },

        async update(req: Request, res: Response) {
                const id = parseInt(req.params.id)
                const { name, email, password } = req.body

                const user = await prisma.user.update({ where: { id: id },
                        data: {
                                name: name,
                                email: email,
                                password: password
                        },
                })
                if (user) {
                        res.status(200).json(user);
                } else {
                        res.status(400).json({ message: ' Id do Usuário não localizado' })
                }
        },

        async delete(req: Request, res: Response) {
                const id = parseInt(req.params.id)

                const user = await prisma.user.delete({ where: { id: id } })
                if (user) {
                        res.status(200).json( { message:'Usuário excluido com sucesso!'});
                } else {
                        res.status(400).json({ message: ' Id do Usuário não localizado' })
                }
        }

}


