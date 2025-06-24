import { TCategory } from './category.interface';
import httpStatus from 'http-status';
import { Category } from './category.model';
import AppError from '../../errors/appError';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';

// create new category
const createCategoryIntoDb = async (payload: TCategory, req: Request) => {
  // image uploading
  const uploadImage = await handleImageUpload(req);

  if (!uploadImage) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Image upload failed.',
      'ImageUploadError',
    );
  }
  payload.imageUrl = uploadImage as string;
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
