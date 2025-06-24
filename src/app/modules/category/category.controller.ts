import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';
import httpStatus from 'http-status';

// create new category
const createCategory = asyncHandler(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDb(
    req.body.category,
    req,
  );

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully.!',
    data: result,
  });
});

// get all categories
const getAllCategories = asyncHandler(async (req, res) => {
  const result = await CategoryServices.getAllCategoriesFromDb();
  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'All categories are retrieved successfully.!',
    data: result,
  });
});

// --------------------------------------
export const CategoryControllers = {
  createCategory,
  getAllCategories,
};
