import { Router } from "express";
import UserController from '../controller/UserController';


const routes = Router();

routes.post('/user', UserController.create);
routes.get('/user', UserController.getAll);
routes.get('/user/:id', UserController.getOne);
routes.put('/user/:id', UserController.update);
routes.delete('/user/:id',UserController.delete);

export default routes;