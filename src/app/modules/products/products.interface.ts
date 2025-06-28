import { Types } from 'mongoose';

export type TProduct = {
  productName: string;
  slug?: string;

  price: number;
  stock: number;

  category: Types.ObjectId;
  subCategory: Types.ObjectId;
  brand: Types.ObjectId;
  seller: Types.ObjectId;

  specifications?: Record<string, string>;

  description?: string;

  images?: string[];

  isFeatured?: boolean;
  isDeleted?: boolean;
};
