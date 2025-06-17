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

// get single user
router.route('/user/:id').get(UserControllers.getSingleUser);

// get all users
router.route('/all-users').get(UserControllers.getAllUsers);

// update a user
router
  .route('/update-user/:id')
  .put(
    validateRequest(UserValidations.updateUserValidationSchema),
    UserControllers.updateUser,
  );

export const userRoutes = router;
