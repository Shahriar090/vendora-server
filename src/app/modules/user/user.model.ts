import { model, Schema } from 'mongoose';
import {
  IUser,
  IUserContactInfo,
  IUserName,
  TUserGender,
  TUserRole,
  TUserStatus,
  UserModel,
} from './user.interface';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';
import bcrypt from 'bcrypt';
import config from '../../config';

const userNameSchema = new Schema<IUserName>(
  {
    firstName: {
      type: String,
      required: true,
    },
    middleName: {
      type: String,
    },
    lastName: {
      type: String,
      required: true,
    },
  },
  { _id: false },
);

const userContactInfoSchema = new Schema<IUserContactInfo>(
  {
    mobileNo: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
  },
  { _id: false },
);

const userSchema = new Schema<IUser, UserModel>(
  {
    name: userNameSchema,
    gender: {
      type: String,
      enum: Object.values(USER_GENDER) as TUserGender[],
      required: true,
    },

    age: {
      type: Number,
    },

    contactInfo: userContactInfoSchema,
    password: {
      type: String,
      required: true,
    },

    role: {
      type: String,
      enum: Object.values(USER_ROLES) as TUserRole[],
      default: USER_ROLES.Customer,
    },

    status: {
      type: String,
      enum: Object.values(USER_STATUS) as TUserStatus[],
      default: USER_STATUS.Active,
    },

    isDeleted: {
      type: Boolean,
      default: false,
    },
  },

  { timestamps: true },
);

// hashing the password before save the doc

userSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();
  this.password = await bcrypt.hash(
    this.password,
    Number(config.bcrypt_salt_round),
  );
  next();
});

// excluding deleted users (documents) from get operations
userSchema.pre('find', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

userSchema.pre('findOne', function (next) {
  this.where({ isDeleted: { $ne: true } });
  next();
});

// removing the password field after save the doc
userSchema.post('save', function (doc, next) {
  doc.password = '';
  next();
});

// check is user already exists or not using static method
userSchema.statics.isUserExists = async function (email: string) {
  return this.findOne({ 'contactInfo.email': email }).select('+password');
};

// static method to check if the plain-text password matches the hashed password.
userSchema.statics.isPasswordMatched = async function (
  plainTextPassword: string,
  hashedPassword: string,
) {
  const result = await bcrypt.compare(plainTextPassword, hashedPassword);
  return result;
};
export const User = model<IUser, UserModel>('User', userSchema);
