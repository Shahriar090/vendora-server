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

// get all brands
const getAllBrands = asyncHandler(async (req, res) => {
  const result = await BrandServices.getAllBrandsFromDb();
  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All brands are retrieved successfully.!',
    data: result,
  });
});

// get single brand
const getSingleBrand = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await BrandServices.getSingleBrandFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Brand data retrieved successfully.!',
    data: result,
  });
});
// --------------------------export brand controller logic------------------//
export const BrandControllers = {
  createBrand,
  getAllBrands,
  getSingleBrand,
};
