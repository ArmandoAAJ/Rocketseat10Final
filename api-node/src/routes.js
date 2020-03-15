import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionCntroller';

import RecipientController from './app/controllers/RecipienteController';

import FileController from './app/controllers/FileController';

import DeliverymanController from './app/controllers/DeliverymanController';

import SignDelivery from './app/controllers/SignDelivery';

import OrderController from './app/controllers/OrderController';

import ListOrderController from './app/controllers/ListOrder';

import OrderStartController from './app/controllers/OrderStartController';

import OrderEndController from './app/controllers/OrderEndController';

import ProblemController from './app/controllers/ProblemController';

const routes = new Router();
const upload = multer(multerConfig);

// Rotas User Admin
routes.post('/users', UserController.store);
routes.put('/users', authMiddleware, UserController.update);
routes.post('/sessions', SessionController.store);

// Recipient
routes.post('/recipients', authMiddleware, RecipientController.store);
routes.put('/recipients/:id', authMiddleware, RecipientController.update);
// busca por nome do Destinatário
routes.get('/recipients', authMiddleware, RecipientController.index);
routes.delete('/recipients/:id', authMiddleware, RecipientController.delete);

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

// sign deliveryman mobile

routes.get('/deliverymans/:id', SignDelivery.index);

// Order
routes.post('/orders', authMiddleware, OrderController.store);
routes.put('/orders/:id', authMiddleware, OrderController.update);
routes.get('/orders', authMiddleware, OrderController.index);
routes.delete('/orders/:id', authMiddleware, OrderController.delete);

// List Orders Deliverman
routes.get('/orders/:id/list', ListOrderController.index);
routes.get('/orders/:id/delivered', ListOrderController.show);

// Order Start Deliveryman
routes.put('/orders/:id/start', OrderStartController.update);

// Order End Deliveryman
routes.put('/orders/:id/end', OrderEndController.update);

// delivery error
routes.post('/orders/problems', ProblemController.store);

routes.get('/problems', authMiddleware, ProblemController.index);

routes.delete('/problems/:id', authMiddleware, ProblemController.delete);

export default routes;
