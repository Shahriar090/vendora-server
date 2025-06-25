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

// ----------------------------Sub Categories Routes--------------------------//
export const subCategoriesRoutes = router;
