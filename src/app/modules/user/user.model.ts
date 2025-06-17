import { model, Schema } from 'mongoose';
import {
  IUser,
  IUserContactInfo,
  IUserName,
  TUserGender,
  TUserRole,
  TUserStatus,
} from './user.interface';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';

const userNameSchema = new Schema<IUserName>({
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
});

const userContactInfoSchema = new Schema<IUserContactInfo>({
  mobileNo: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
});

const userSchema = new Schema<IUser>(
  {
    name: userNameSchema,
    gender: {
      type: String,
      enum: Object.values(USER_GENDER) as TUserGender[],
      required: true,
    },

    age: {
      type: Number,
      required: true,
    },

    contactInfo: userContactInfoSchema,
    password: {
      type: String,
      required: true,
      unique: true,
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

export const User = model<IUser>('User', userSchema);
