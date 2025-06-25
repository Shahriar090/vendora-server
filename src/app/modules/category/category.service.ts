import { TCategory } from './category.interface';
import httpStatus from 'http-status';
import { Category } from './category.model';
import AppError from '../../errors/appError';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';
import { deleteOldImageFromCloudinary } from '../../utils/deleteOldImageFromCloudinary';

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

// get all categories
const getAllCategoriesFromDb = async () => {
  const result = await Category.find();

  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No category found.!',
      'CategoryNotFound',
    );
  }

  return result;
};

// get a single category
const getSingleCategoryFromDb = async (id: string) => {
  const result = await Category.findById(id);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Category not found.!',
      'CategoryNotFound',
    );
  }

  return result;
};

// update category
const updateCategoryIntoDb = async (
  id: string,
  payload: Partial<TCategory>,
  req: Request,
) => {
  // check if the category is exist
  const existingCategory = await Category.findById(id);

  if (!existingCategory) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Category not found.!',
      'CategoryNotFound',
    );
  }

  // image update if needed
  let uploadedImageUrl: string | string[] | null = null;

  if (req.file || req.files) {
    // delete old image first
    if (existingCategory.imageUrl) {
      await deleteOldImageFromCloudinary(existingCategory.imageUrl);
    }

    // upload new image
    uploadedImageUrl = await handleImageUpload(req);

    if (!uploadedImageUrl) {
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Image uploading failed.!',
        'ImageUploadError',
      );
    }
  }
  // preparing updated data
  const updatedData = {
    ...payload,
    ...(uploadedImageUrl && { imageUrl: uploadedImageUrl }),
  };

  // update category
  const updatedCategory = await Category.findByIdAndUpdate(id, updatedData, {
    new: true,
    runValidators: true,
  });

  return updatedCategory;
};

// ---------------------------------------------

export const CategoryServices = {
  createCategoryIntoDb,
  getAllCategoriesFromDb,
  getSingleCategoryFromDb,
  updateCategoryIntoDb,
};
