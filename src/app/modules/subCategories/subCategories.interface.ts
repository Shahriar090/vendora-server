import { Types } from 'mongoose';

export type TSubCategories = {
  subCategoryName: string;
  categoryName: string;
  slug: string;
  description: string;
  imageUrl?: string;
  category: Types.ObjectId;
  isDeleted: boolean;
};
