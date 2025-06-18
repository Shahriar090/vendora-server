import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { AuthValidations } from './auth.validation';
import { AuthControllers } from './auth.controller';
const router = express.Router();

// login user
router
  .route('/login')
  .post(
    validateRequest(AuthValidations.loginUserValidationSchema),
    AuthControllers.loginUser,
  );

// refresh token
router
  .route('/refresh-token')
  .post(
    validateRequest(AuthValidations.refreshTokenValidationSchema),
    AuthControllers.refreshToken,
  );

// ------------------------
export const authRoutes = router;
