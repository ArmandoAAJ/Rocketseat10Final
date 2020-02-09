import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionCntroller';

import RecipientController from './app/controllers/RecipienteController';

import FileController from './app/controllers/FileController';

import DeliverymanController from './app/controllers/DeliverymanController';

import OrderController from './app/controllers/OrderController';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas User Admin
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.post('/sessions', SessionController.store);

// Recipient
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients/:id', authMiddleware, RecipientController.update);

// File avatar_id Deliveryman
routes.post('/files', upload.single('file'), FileController.store);

// Deliveryman
routes.post('/deliverymans', authMiddleware, DeliverymanController.store);
routes.put('/deliverymans/:id', authMiddleware, DeliverymanController.update);
routes.get('/deliverymans', authMiddleware, DeliverymanController.index);
routes.delete(
  '/deliverymans/:id',
  authMiddleware,
  DeliverymanController.delete
);

// Order
routes.post('/orders', authMiddleware, OrderController.store);
routes.put('/orders/:id', authMiddleware, OrderController.update);
routes.get('/orders', authMiddleware, OrderController.index);
routes.delete('/orders/:id', authMiddleware, OrderController.delete);

export default routes;
