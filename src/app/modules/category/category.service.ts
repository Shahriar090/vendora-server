import { TCategory } from './category.interface';
import httpStatus from 'http-status';
import { Category } from './category.model';
import AppError from '../../errors/appError';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';

// create new category
const createCategoryIntoDb = async (payload: TCategory, req: Request) => {
  // image uploading
  const uploadedImageUrl = await handleImageUpload(req);

  if (!uploadedImageUrl) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Image upload failed.',
      'ImageUploadError',
    );
  }
  // check if the category is already exist or not
  const isCategoryExists = await Category.findOne({
    categoryName: payload.categoryName,
  });

  if (isCategoryExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The category "${payload.categoryName}" already exists.`,
      'CategoryExistingError',
    );
  }

  //   create new category if it does not exist
  const newCategory = new Category({ ...payload, imageUrl: uploadedImageUrl });

  const result = await newCategory.save();
  return result;
};

// ---------------------------------------------

export const CategoryServices = { createCategoryIntoDb };
