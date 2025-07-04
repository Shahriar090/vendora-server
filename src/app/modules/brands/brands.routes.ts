import express from 'express';
import { upload } from '../../middlewares/multer.config';
import { parseFormData } from '../../utils/parseFormData';
import validateRequest from '../../middlewares/validateRequest';
import { BrandValidations } from './brands.validations';
import { BrandControllers } from './brands.controllers';
const router = express.Router();

// create new brand
router
  .route('/create-brand')
  .post(
    upload.single('brandImage'),
    parseFormData,
    validateRequest(BrandValidations.createBrandValidationSchema),
    BrandControllers.createBrand,
  );

// get all brands
router.route('/all-brands').get(BrandControllers.getAllBrands);

// get a single brand
router.route('/single-brand/:id').get(BrandControllers.getSingleBrand);

// update a brand
router
  .route('/update-brand/:id')
  .put(
    upload.single('brandImage'),
    parseFormData,
    validateRequest(BrandValidations.updateBrandValidationSchema),
    BrandControllers.updateBrand,
  );

// delete a brand
router.route('/delete-brand/:id').delete(BrandControllers.deleteBrand);
// -----------------------export brand routes------------------------//
export const brandRoutes = router;
