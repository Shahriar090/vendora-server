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
    statusCode: httpStatus.OK,
    success: true,
    message: 'All categories are retrieved successfully.!',
    data: result,
  });
});

// get single category
const getSingleCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.getSingleCategoryFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category retrieved successfully.!',
    data: result,
  });
});

// update category
const updateCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const { category } = req.body;
  const result = await CategoryServices.updateCategoryIntoDb(id, category, req);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category updated successfully.!',
    data: result,
  });
});

// delete a category
const deleteCategory = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await CategoryServices.deleteCategoryFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'Category deleted successfully.!',
    data: result,
  });
});

// --------------------------------------
export const CategoryControllers = {
  createCategory,
  getAllCategories,
  getSingleCategory,
  updateCategory,
  deleteCategory,
};
