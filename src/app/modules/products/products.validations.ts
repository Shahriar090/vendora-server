import { z } from 'zod';

// create product validation schema
const createProductValidationSchema = z.object({
  body: z.object({
    product: z.object({
      productName: z.string({ required_error: 'Product name is required' }),
      price: z.number({ required_error: 'Price is required' }),
      stock: z.number({ required_error: 'Stock is required' }),

      category: z.string({ required_error: 'Category ID is required' }),
      subCategory: z.string({ required_error: 'Sub-category ID is required' }),
      brand: z.string({ required_error: 'Brand ID is required' }),
      seller: z.string({ required_error: 'Seller ID is required' }),

      specifications: z.record(z.string()).optional(),

      description: z.string().optional(),
      images: z.array(z.string().url('Image URL must be valid')).optional(),

      isFeatured: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// update product validation schema
const updateProductValidationSchema = z.object({
  body: z.object({
    product: z.object({
      productName: z.string().optional(),
      price: z.number().optional(),
      stock: z.number().optional(),

      category: z.string().optional(),
      subCategory: z.string().optional(),
      brand: z.string().optional(),
      seller: z.string().optional(),

      specifications: z.record(z.string()).optional(),

      description: z.string().optional(),
      images: z.array(z.string().url()).optional(),

      isFeatured: z.boolean().optional(),
      isDeleted: z.boolean().optional(),
    }),
  }),
});

// ---------------------export product validation schema---------------------//
export const ProductValidations = {
  createProductValidationSchema,
  updateProductValidationSchema,
};
