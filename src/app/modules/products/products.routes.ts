import express from 'express';
import { upload } from '../../middlewares/multer.config';
import { parseFormData } from '../../utils/parseFormData';
import validateRequest from '../../middlewares/validateRequest';
import { ProductValidations } from './products.validations';
import { ProductControllers } from './products.controllers';
const router = express.Router();

// create product
router
  .route('/create-product')
  .post(
    upload.array('productImages'),
    parseFormData,
    validateRequest(ProductValidations.createProductValidationSchema),
    ProductControllers.createProduct,
  );

// ------------------------export product routes--------------------------//
export const productRoutes = router;
