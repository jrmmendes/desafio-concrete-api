import { Router } from 'express';
import userController from '../controllers/user-controller';

const router = Router();

router
  .route('/sign-up')
  .post(userController.create);

export default router;
