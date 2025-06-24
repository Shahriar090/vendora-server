/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';
import fs from 'fs';
import config from '../config';

// ------------cloudinary configuration-----------------//
cloudinary.config({
  cloud_name: config.cloudinary_cloud_name,
  api_key: config.cloudinary_api_key,
  api_secret: config.cloudinary_api_secret,
});

export type TCloudinaryUploadResult = {
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
