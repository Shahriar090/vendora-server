import { Request, Express } from 'express';
import { sendImageToCloudinary } from './sendImageToCloudinary';

export const handleImageUpload = async (
  req: Request,
): Promise<string | string[] | null> => {
  if (!req.file && !req.files) return null;

  let images: Express.Multer.File[] = [];

  if (req.file) {
    images = [req.file];
  } else if (Array.isArray(req.files)) {
    images = req.files;
  } else if (typeof req.files === 'object') {
    for (const key in req.files) {
      images.push(...(req.files[key] as Express.Multer.File[]));
    }
  }

  if (images.length === 0) return null;

  const uploadResults = await Promise.all(
    images.map(async (image) => {
      const result = await sendImageToCloudinary(
        image.originalname,
        image.path,
      );
      return result?.secure_url || null;
    }),
  );

  const successful = uploadResults.filter(Boolean) as string[];

  return successful.length === 1
    ? successful[0]
    : successful.length
      ? successful
      : null;
};
