import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { ProductServices } from './products.services';
import sendResponse from '../../utils/sendResponse';

// create new product
const createProduct = asyncHandler(async (req, res) => {
  const { product } = req.body;
  const result = await ProductServices.createProductIntoDb(product, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Product created successfully',
    data: result,
  });
});

// -------------------export product controller logic--------------------------//
export const ProductControllers = {
  createProduct,
};
