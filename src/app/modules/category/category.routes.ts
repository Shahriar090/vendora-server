import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';
const router = express.Router();

router
  .route('/create-category')
  .post(
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory,
  );

// ---------------------------
export const categoryRoutes = router;
