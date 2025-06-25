import express from 'express';
import validateRequest from '../../middlewares/validateRequest';
import { CategoryValidations } from './category.validation';
import { CategoryControllers } from './category.controller';
import { upload } from '../../middlewares/multer.config';
import { parseFormData } from '../../utils/parseFormData';
const router = express.Router();

// create
router
  .route('/create-category')
  .post(
    upload.single('categoryImage'),
    parseFormData,
    validateRequest(CategoryValidations.createCategoryValidationSchema),
    CategoryControllers.createCategory,
  );

// get all
router.route('/all-categories').get(CategoryControllers.getAllCategories);

// get single
router.route('/single-category/:id').get(CategoryControllers.getSingleCategory);

// update a category
router
  .route('/update-category/:id')
  .put(
    upload.single('categoryImage'),
    parseFormData,
    validateRequest(CategoryValidations.updateCategoryValidationSchema),
    CategoryControllers.updateCategory,
  );

// delete a category
router.route('/delete-category/:id').delete(CategoryControllers.deleteCategory);

// ---------------------------
export const categoryRoutes = router;
