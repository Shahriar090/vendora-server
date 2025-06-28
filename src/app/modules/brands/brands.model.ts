import { model, Schema } from 'mongoose';
import slugify from 'slugify';
import { TBrand, TBrandStatus } from './brands.interface';
import { BRAND_STATUS } from './brands.constant';

const brandSchema = new Schema<TBrand>(
  {
    brandName: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
    },
    imageUrl: {
      type: String,
      required: true,
    },
    website: {
      type: String,
    },
    originCountry: {
      type: String,
    },
    isFeatured: {
      type: Boolean,
      default: false,
    },
    isActive: {
      type: String,
      enum: Object.values(BRAND_STATUS) as TBrandStatus[],
      default: BRAND_STATUS.Active,
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  {
    timestamps: true,
  },
);

// Auto-generate slug from brand name before saving
brandSchema.pre('save', function (next) {
  if (this.isModified('brandName')) {
    this.slug = slugify(this.brandName, { lower: true, strict: true });
  }
  next();
});

/**NOTE: If the query explicitly targets the deleted docs (for example, restoring deleted docs), it will work as the query. Otherwise, it will filter out all the deleted docs for find operations. */

brandSchema.pre('find', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = this as any;
  if (query._conditions && query._conditions.isDeleted === true) {
    return next();
  }
  this.where({ isDeleted: { $ne: true } });
  next();
});

brandSchema.pre('findOne', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = this as any;

  if (query._conditions && query._conditions.isDeleted === true) {
    return next();
  }
  this.where({ isDeleted: { $ne: true } });
  next();
});
// Model export
export const Brand = model<TBrand>('Brand', brandSchema);
