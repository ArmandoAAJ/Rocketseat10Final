import { Router } from 'express';
import UserController from './app/controllers/UserController';

const routes = new Router();

// Rotas User Admin
routes.post('/users', UserController.store);

export default routes;
