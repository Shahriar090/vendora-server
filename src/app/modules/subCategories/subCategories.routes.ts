import express from 'express';
import { upload } from '../../middlewares/multer.config';
import { parseFormData } from '../../utils/parseFormData';
import { SubCategoryControllers } from './subCategories.controllers';
import validateRequest from '../../middlewares/validateRequest';
import { SubCategoryValidations } from './subCategories.validations';
const router = express.Router();

// create sub category
router
  .route('/create-sub-category')
  .post(
    upload.single('subCategoryImg'),
    parseFormData,
    validateRequest(SubCategoryValidations.createSubCategoryValidationSchema),
    SubCategoryControllers.createSubCategory,
  );

// get all sub categories
router
  .route('/all-sub-categories')
  .get(SubCategoryControllers.getAllSubCategories);

// get a single sub category
router
  .route('/single-sub-category/:id')
  .get(SubCategoryControllers.getSingleSubCategory);

// update sub category
router
  .route('/update-sub-category/:id')
  .put(
    upload.single('subCategoryImg'),
    parseFormData,
    validateRequest(SubCategoryValidations.updateSubCategoryValidationSchema),
    SubCategoryControllers.updateSubCategory,
  );

// delete a sub category
router
  .route('/delete-sub-category/:id')
  .delete(SubCategoryControllers.deleteSubCategory);

// ----------------------------Sub Categories Routes--------------------------//
export const subCategoriesRoutes = router;
