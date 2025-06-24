import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';
import { upload } from '../../middlewares/multer.config';
import { parseFormData } from '../../utils/parseFormData';
const router = express.Router();

router
  .route('/create-category')
  .post(
    upload.single('categoryImage'),
    parseFormData,
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory,
  );

// ---------------------------
export const categoryRoutes = router;
