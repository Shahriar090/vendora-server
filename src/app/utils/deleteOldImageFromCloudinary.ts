/* eslint-disable @typescript-eslint/no-explicit-any */
import { v2 as cloudinary } from 'cloudinary';

const extractPublicIdFromUrl = (imageUrl: string): string | null => {
  try {
    const url = new URL(imageUrl);
    const pathname = url.pathname;

    const uploadIndex = pathname.indexOf('/upload/');
    if (uploadIndex === -1) {
      console.warn('Invalid Cloudinary URL structure');
      return null;
    }

    let pathAfterUpload = pathname.substring(uploadIndex + 8);

    if (pathAfterUpload.match(/^v\d+\//)) {
      pathAfterUpload = pathAfterUpload.replace(/^v\d+\//, '');
    }

    const lastDotIndex = pathAfterUpload.lastIndexOf('.');
    const publicId =
      lastDotIndex > 0
        ? pathAfterUpload.substring(0, lastDotIndex)
        : pathAfterUpload;

    console.log('Extracted public ID:', publicId);
    return publicId;
  } catch (err) {
    console.error('Error extracting public ID:', err);
    return null;
  }
};

export const deleteOldImageFromCloudinary = async (
  imageUrl: string,
): Promise<void> => {
  try {
    const publicId = extractPublicIdFromUrl(imageUrl);

    if (!publicId) {
      console.warn('No valid publicId extracted from imageUrl:', imageUrl);
      return;
    }

    console.log('Attempting to delete image with public ID:', publicId);

    const result = await cloudinary.uploader.destroy(publicId);

    if (result.result !== 'ok') {
      console.warn('Cloudinary image delete response:', result);

      if (result.result === 'not found') {
        console.log('Trying with resource_type: raw');
        const rawResult = await cloudinary.uploader.destroy(publicId, {
          resource_type: 'raw',
        });
        if (rawResult.result === 'ok') {
          console.log('Successfully deleted as raw resource:', publicId);
        } else {
          console.warn('Failed to delete as raw resource:', rawResult);
        }
      }
    } else {
      console.log('Successfully deleted image from Cloudinary:', publicId);
    }
  } catch (error: any) {
    console.error('Error deleting image from Cloudinary:', error.message);
  }
};
