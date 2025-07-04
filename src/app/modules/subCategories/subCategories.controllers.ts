import httpStatus from 'http-status';
import asyncHandler from '../../utils/asyncHandler';
import { SubCategoryServices } from './subCategories.services';
import sendResponse from '../../utils/sendResponse';

// create sub category
const createSubCategory = asyncHandler(async (req, res) => {
  const { subCategory } = req.body;
  const result = await SubCategoryServices.createSubCategoryIntoDb(
    subCategory,
    req,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Sub category created successfully',
    data: result,
  });
});

// get all sub categories
const getAllSubCategories = asyncHandler(async (req, res) => {
  const result = await SubCategoryServices.getAllSubCategoriesFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All sub categories are retrieved successfully',
    data: result,
  });
});

// get a single sub category
const getSingleSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoryServices.getSingleSubCategoryFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category data retrieved successfully',
    data: result,
  });
});

// update sub category
const updateSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { subCategory } = req.body;

  const result = await SubCategoryServices.updateSubCategoryIntoDb(
    id,
    subCategory,
    req,
  );

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category data updated successfully',
    data: result,
  });
});

// delete a sub category
const deleteSubCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await SubCategoryServices.deleteSubCategoryFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Sub category deleted successfully',
    data: result,
  });
});
// --------------export sub category controller functions-------------------//
export const SubCategoryControllers = {
  createSubCategory,
  getAllSubCategories,
  getSingleSubCategory,
  updateSubCategory,
  deleteSubCategory,
};
