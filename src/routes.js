import { Router } from 'express';
import multer from 'multer';
import multerConfig from './config/multer';
// import User from './app/models/User';
import UserController from './app/controllers/UserController';
import SessionController from './app/controllers/SessionController';

import authMiddleware from './app/middlewares/auth';
import FileController from './app/controllers/FileController';
import ProviderController from './app/controllers/ProviderController';

const routes = new Router();
const upload = multer(multerConfig);
// processo de criacao/alterar do sequelize é assincrona
// routes.get('/', async (req, res) => {
//   const user = await User.create({
//     name: 'Victor',
//     email: 'victor@gmail.com',
//     password_hash: '123123'
//   });
//   return res.json(user);
// });

routes.post('/users', UserController.store);
routes.post('/sessions', SessionController.store);

// Definido como middleware global
// serve apenas para rotas apos ele
routes.use(authMiddleware);

routes.put('/users', UserController.update);

routes.get('/providers', ProviderController.index);

routes.post('/files', upload.single('file'), FileController.store);

// definido como local
// routes.put('/users', authMiddleware, UserController.update);

export default routes;
