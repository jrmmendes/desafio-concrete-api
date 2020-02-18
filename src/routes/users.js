import { Router } from 'express';

import userController from '../controllers/user-controller';

const router = Router();

router
  .route('/users/:id')
  .get(
    userController.search,
  );

router
  .route('/users/sign-up')
  .post(
    userController.signUp,
  );

router
  .route('/users/sign-in')
  .post(
    userController.signIn,
  );


export default router;
