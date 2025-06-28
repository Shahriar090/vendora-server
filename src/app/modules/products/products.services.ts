import httpStatus from 'http-status';
import { TProduct } from './products.interface';
import { Request } from 'express';
import { handleImageUpload } from '../../utils/imageUpload';
import AppError from '../../errors/appError';
import { Product } from './products.model';

//**
// NOTE: Sellers won't be able to add new products directly. An admin will review the product, and if the admin accepts it, it will appear in the UI. If the admin rejects the product, it will not appear in the UI. This functionality will be available soon after the admin features are implemented
//  */

// create a product into db
const createProductIntoDb = async (payload: TProduct, req: Request) => {
  // images uploading
  const uploadedImagesUrls = await handleImageUpload(req);

  if (!uploadedImagesUrls) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Images upload failed.',
      'ImagesUploadError',
    );
  }

  // check if the product is already exist or not
  const isProductExists = await Product.findOne({
    productName: { $regex: new RegExp(`^${payload.productName}$`, 'i') },
  });

  if (isProductExists) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      `The product "${payload.productName}" already exists.`,
      'ProductExistingError',
    );
  }

  const newProduct = new Product({ ...payload, images: uploadedImagesUrls });

  await newProduct.save();
  return newProduct;
};

// -------------------------export product service logic-----------------//
export const ProductServices = {
  createProductIntoDb,
};
