import asyncHandler from '../../utils/asyncHandler';
import sendResponse from '../../utils/sendResponse';
import { CategoryServices } from './category.service';
import httpStatus from 'http-status';

// create new category
const createCategory = asyncHandler(async (req, res) => {
  const result = await CategoryServices.createCategoryIntoDb(req.body.category);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'Category created successfully.!',
    data: result,
  });
});

// --------------------------------------
export const CategoryControllers = {
  createCategory,
};
