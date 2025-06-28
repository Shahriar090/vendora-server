import httpStatus from 'http-status';
import { TBrand } from './brands.interface';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';
import AppError from '../../errors/appError';
import { Brand } from './brands.model';

// create new brand into db
const createBrandIntoDb = async (payload: TBrand, req: Request) => {
  // image uploading
  const uploadedImageUrl = await handleImageUpload(req);

  if (!uploadedImageUrl) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Image upload failed.',
      'ImageUploadError',
    );
  }
  // check if the brand is already exist or not
  const isBrandExists = await Brand.findOne({
    // using regex to prevent Samsung and samsung from being treated as different brands
    brandName: { $regex: new RegExp(`^${payload.brandName}$`, 'i') },
  });

  if (isBrandExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The brand "${payload.brandName}" already exists.`,
      'BrandExistingError',
    );
  }

  //   create new brand if it does not exist
  const newBrand = new Brand({ ...payload, imageUrl: uploadedImageUrl });

  const result = await newBrand.save();
  return result;
};

// ---------------------------export brand service logic------------------------//
export const BrandServices = {
  createBrandIntoDb,
};
