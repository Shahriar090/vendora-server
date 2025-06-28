import { Schema, model } from 'mongoose';
import slugify from 'slugify';
import { TProduct } from './products.interface';

const productSchema = new Schema<TProduct>(
  {
    productName: {
      type: String,
      required: true,
      trim: true,
    },

    slug: {
      type: String,
      lowercase: true,
      unique: true,
    },

    price: {
      type: Number,
      required: true,
    },

    stock: {
      type: Number,
      required: true,
    },

    category: {
      type: Schema.Types.ObjectId,
      ref: 'Category',
      required: true,
    },

    subCategory: {
      type: Schema.Types.ObjectId,
      ref: 'SubCategory',
      required: true,
    },

    brand: {
      type: Schema.Types.ObjectId,
      ref: 'Brand',
      required: true,
    },

    seller: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: true,
    },

    specifications: {
      type: Map,
      of: String,
      default: {},
    },

    description: {
      type: String,
    },

    images: {
      type: [String],
      default: [],
    },

    isFeatured: {
      type: Boolean,
      default: false,
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

// Auto-generate slug if productName is modified
productSchema.pre('save', function (next) {
  if (this.isModified('productName')) {
    this.slug = slugify(this.productName, { lower: true, strict: true });
  }
  next();
});

// Filter out soft-deleted products on find
productSchema.pre('find', function (next) {
  if (!(this.getQuery().isDeleted === true)) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});

productSchema.pre('findOne', function (next) {
  if (!(this.getQuery().isDeleted === true)) {
    this.where({ isDeleted: { $ne: true } });
  }
  next();
});

export const Product = model<TProduct>('Product', productSchema);
