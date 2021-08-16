import * as UserController from './controllers/user';

const router = (app) => {

  app.get('/api/user', UserController.getAll);
  app.get('/api/user/:email', UserController.getOne);
  app.post('/api/user', UserController.createOne);
}
export default router;
