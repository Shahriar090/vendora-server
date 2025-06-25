import { model, Schema } from 'mongoose';
import { TSubCategories } from './subCategories.interface';
import slugify from 'slugify';

const subCategorySchema = new Schema<TSubCategories>(
  {
    subCategoryName: {
      type: String,
      required: true,
    },
    categoryName: {
      type: String,
      required: true,
    },
    slug: {
      type: String,
      lowercase: true,
      required: true,
      unique: true,
    },
    description: {
      type: String,
      required: true,
    },
    imageUrl: {
      type: String,
    },
    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
  },
  { timestamps: true },
);

// adding slug
// auto-generate slug whenever categoryName is modified
subCategorySchema.pre('save', function (next) {
  if (this.isModified('subCategoryName')) {
    this.slug = slugify(this.categoryName, { lower: true, strict: true });
  }
  next();
});
// Pre middleware for find operations (excludes soft-deleted documents)

/**NOTE: If the query explicitly targets the deleted docs (for example, restoring deleted docs), it will work as the query. Otherwise, it will filter out all the deleted docs for find operations. */
subCategorySchema.pre('find', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = this as any;
  if (query._conditions && query._conditions.isDeleted === true) {
    return next();
  }
  this.where({ isDeleted: { $ne: true } });
  next();
});

subCategorySchema.pre('findOne', function (next) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const query = this as any;

  if (query._conditions && query._conditions.isDeleted === true) {
    return next();
  }
  this.where({ isDeleted: { $ne: true } });
  next();
});

// model
export const SubCategories = model<TSubCategories>(
  'SubCategory',
  subCategorySchema,
);
