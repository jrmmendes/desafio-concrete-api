import bearerToken from 'express-bearer-token';
import { Router } from 'express';

import userController from '../controllers/user-controller';

const router = Router();

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

router
  .route('/users/:id')
  .post(
    bearerToken({ reqKey: 'accessToken' }),
    userController.search,
  );

export default router;
