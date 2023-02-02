import { Router } from "express";
import AuthController from "../controller/AuthController";
import UserController from '../controller/UserController';
import { authMiddleware } from '../middlewares';


const routes = Router();
//login
routes.post('/login', AuthController.login);
routes.post('/user', UserController.create);

routes.use(authMiddleware);
    //usuario 
    routes.post('/super', UserController.createSuper);
    routes.get('/user', UserController.getAll);
    routes.get('/user/:id', UserController.getOne);
    routes.put('/user/:id', UserController.update);
    routes.delete('/user/:id',UserController.delete);
    routes.post('/me', AuthController.me)
   
export default routes;