import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { UserValidations } from './user.validation';
import { UserControllers } from './user.controller';
const router = express.Router();

// create user
router
  .route('/create-user')
  .post(
    validateRequest(UserValidations.createUserValidationSchema),
    UserControllers.createUser,
  );

export const userRoutes = router;
