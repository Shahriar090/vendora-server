import { BRAND_STATUS } from './brands.constant';

export type TBrandStatus = (typeof BRAND_STATUS)[keyof typeof BRAND_STATUS];

export type TBrand = {
  brandName: string;
  slug: string;
  description?: string;
  imageUrl?: string;
  website?: string;
  originCountry?: string;
  isFeatured?: boolean;
  isActive: TBrandStatus;
  isDeleted: boolean;
};
