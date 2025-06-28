import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { BrandServices } from './brands.services';
import sendResponse from '../../utils/sendResponse';

// create new brand
const createBrand = asyncHandler(async (req, res) => {
  const { brand } = req.body;
  const result = await BrandServices.createBrandIntoDb(brand, req);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Brand created successfully',
    data: result,
  });
});

// --------------------------export brand controller logic------------------//
export const BrandControllers = {
  createBrand,
};
