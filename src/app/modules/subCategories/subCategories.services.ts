import httpStatus from 'http-status';
import { TSubCategories } from './subCategories.interface';
import { Category } from '../category/category.model';
import AppError from '../../errors/appError';
import { SubCategories } from './subCategories.model';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';
import { deleteOldImageFromCloudinary } from '../../utils/deleteOldImageFromCloudinary';

// create sub category into db
const createSubCategoryIntoDb = async (
  payload: TSubCategories,
  req: Request,
) => {
  const categorySlug = payload.categoryName.toLowerCase().replace(/\s+/g, '-');

  const category = await Category.findOne({ slug: categorySlug });

  if (!category) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No category found.!',
      'NoCategoryFound',
    );
  }

  //   check if the sub category is already exist under this specific category

  const isExist = await SubCategories.findOne({
    subCategoryName: payload.subCategoryName,
    category: category._id,
  });

  if (isExist) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `This sub category ${payload.subCategoryName} is already exist under this category.!`,
      'SubCategoryExists',
    );
  }

  //   image uploading logic
  const uploadedImageUrl = await handleImageUpload(req);

  if (!uploadedImageUrl) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Image upload failed.',
      'ImageUploadError',
    );
  }

  //   merging data to create new sub category
  const subCategoryData = {
    ...payload,
    imageUrl: uploadedImageUrl,
    category: category._id,
  };

  const result = await SubCategories.create(subCategoryData);

  return result;
};

// get all sub categories from db
const getAllSubCategoriesFromDb = async () => {
  const result = await SubCategories.find();

  if (!result.length) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No sub category found.!',
      'SubCategoryNotFound',
    );
  }

  return result;
};

// get a single sub category from db
const getSingleSubCategoryFromDb = async (id: string) => {
  const result = await SubCategories.findById(id);

  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No sub category found with this id.!',
      'SubCategoryNotFound',
    );
  }

  return result;
};

// update a sub category into db
const updateSubCategoryIntoDb = async (
  id: string,
  payload: Partial<TSubCategories>,
  req: Request,
) => {
  // check if the sub category is exist
  const existingSubCategory = await SubCategories.findById(id);

  if (!existingSubCategory) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'Sub category not found.!',
      'SubCategoryNotFound',
    );
  }

  // image update if needed
  let uploadedImageUrl: string | string[] | null = null;

  if (req.file || req.files) {
    // delete old image first
    if (existingSubCategory.imageUrl) {
      await deleteOldImageFromCloudinary(existingSubCategory.imageUrl);
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

  // update sub category
  const updatedSubCategory = await SubCategories.findByIdAndUpdate(
    id,
    updatedData,
    {
      new: true,
      runValidators: true,
    },
  );

  return updatedSubCategory;
};
// ------------------export sub categories service functions-------------------//

export const SubCategoryServices = {
  createSubCategoryIntoDb,
  getAllSubCategoriesFromDb,
  getSingleSubCategoryFromDb,
  updateSubCategoryIntoDb,
};
