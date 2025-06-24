/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import multer from 'multer';
import fs from 'fs';
import path from 'path';
import config from '../config';
import { Request, Express } from 'express';
import { v4 as uuidv4 } from 'uuid';

// ------------cloudinary configuration-----------------//
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

// -----------------upload directory setup-------------------//
const uploadDir = path.join(process.cwd(), 'src/uploads');
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// --------------------multer storage configuration-----------------------//
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, uploadDir);
  },

  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const uniqueName = uuidv4() + ext;
    cb(null, uniqueName);
  },
});

// ----------------------multer upload middleware----------------------//
export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith('image/')) {
      return cb(null, false);
    }
    cb(null, true);
  },
});

// -----------------------cloudinary upload helper------------------------//

type TCloudinaryUploadResult = {
  public_id: string;
  secure_url: string;
  [key: string]: any;
};

export const sendImageToCloudinary = async (
  imageName: string,
  filePath: string,
): Promise<TCloudinaryUploadResult | null> => {
  try {
    const result = await cloudinary.uploader.upload(filePath, {
      public_id: imageName,
    });

    await fs.promises.unlink(filePath); // delete local file
    console.log('Uploaded and cleaned:', result.secure_url);
    return result;
  } catch (error: any) {
    console.error('Upload failed:', error.message);
    return null;
  }
};

// ----------------------handle image upload logic-----------------------//
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
