import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();

router
  .route('/sign-up')
  .post(
    userController.signUp
  );

router
  .route('/sign-in')
  .post(
    userController.signIn,
  );

export default router;
