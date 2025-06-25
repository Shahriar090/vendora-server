import { z } from 'zod';

// create sub category validation schema
const createSubCategoryValidationSchema = z.object({
  body: z.object({
    subCategory: z.object({
      subCategoryName: z.string().min(1, 'Subcategory name is required'),
      categoryName: z.string().min(1, 'Category name is required'),
      description: z.string().min(1, 'Description is required'),
      imageUrl: z.string().url('Image URL must be a valid URL').optional(),
    }),
  }),
});

// update sub category validation schema
const updateSubCategoryValidationSchema = z.object({
  body: z.object({
    subCategory: z.object({
      subCategoryName: z
        .string()
        .min(1, 'Subcategory name is required')
        .optional(),
      categoryName: z.string().min(1, 'Category name is required').optional(),
      description: z.string().min(1, 'Description is required').optional(),
      imageUrl: z.string().url('Image URL must be a valid URL').optional(),
    }),
  }),
});

// ------------------------------export validation logic---------------------//
export const SubCategoryValidations = {
  createSubCategoryValidationSchema,
  updateSubCategoryValidationSchema,
};
