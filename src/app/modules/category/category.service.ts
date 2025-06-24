import { TCategory } from './category.interface';
import httpStatus from 'http-status';
import { Category } from './category.model';
import AppError from '../../errors/appError';

// create new category
const createCategoryIntoDb = async (payload: TCategory) => {
  // check if the category is already exist or not
  const isCategoryExists = await Category.findOne({
    categoryName: payload.categoryName,
  });

  if (isCategoryExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `${payload.categoryName} category is already exist.!`,
      'CategoryExistingError',
    );
  }

  //   create new category if it does not exist
  const newCategory = new Category({ ...payload });

  const result = await newCategory.save();
  return result;
};

// ---------------------------------------------

export const CategoryServices = { createCategoryIntoDb };
