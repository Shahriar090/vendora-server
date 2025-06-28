import { z } from 'zod';
import { BRAND_STATUS } from './brands.constant';

// create brand validation schema
const createBrandValidationSchema = z.object({
  body: z.object({
    brand: z.object({
      brandName: z.string({
        required_error: 'Brand name is required',
      }),
      description: z.string().optional(),
      imageUrl: z
        .string({
          required_error: 'Image URL is required',
        })
        .url('Image URL must be a valid URL'),
      website: z.string().url('Website must be a valid URL').optional(),
      originCountry: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isActive: z.enum([BRAND_STATUS.Active, BRAND_STATUS.Discontinued], {
        required_error: 'Status is required',
      }),
    }),
  }),
});

// update brand validation schema

const updateBrandValidationSchema = z.object({
  body: z.object({
    brand: z.object({
      brandName: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().url('Image URL must be a valid URL').optional(),
      website: z.string().url('Website must be a valid URL').optional(),
      originCountry: z.string().optional(),
      isFeatured: z.boolean().optional(),
      isActive: z
        .enum([BRAND_STATUS.Active, BRAND_STATUS.Discontinued])
        .optional(),
    }),
  }),
});

// -------------------------export brand validation schema---------------------//
export const BrandValidations = {
  createBrandValidationSchema,
  updateBrandValidationSchema,
};
