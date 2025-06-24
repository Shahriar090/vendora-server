import { z } from 'zod';
import { CATEGORY_STATUS } from './category.constants';

const createCategoryValidationSchema = z.object({
  body: z.object({
    category: z.object({
      categoryName: z.string({ required_error: 'Category name is required' }),
      description: z.string({ required_error: 'Description is required' }),
      imageUrl: z.string().url('Must be a valid URL').optional(),
      status: z
        .enum([CATEGORY_STATUS.Active, CATEGORY_STATUS.Discontinued])
        .optional(),
    }),
  }),
});

// update schema
const updateCategoryValidationSchema = z.object({
  body: z.object({
    category: z.object({
      categoryName: z.string().optional(),
      description: z.string().optional(),
      imageUrl: z.string().url('Must be a valid URL').optional(),
      status: z
        .enum([CATEGORY_STATUS.Active, CATEGORY_STATUS.Discontinued])
        .optional(),
    }),
  }),
});

export const CategoryValidations = {
  createCategoryValidationSchema,
  updateCategoryValidationSchema,
};
