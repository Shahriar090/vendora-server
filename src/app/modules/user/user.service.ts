import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { User } from './user.model';
import bcrypt from 'bcrypt';
import config from '../../config';

// create user into DB
const createUser = async (payload: IUser) => {
  const isUserExist = await User.isUserExists(payload.contactInfo.email);
  if (isUserExist) {
    throw new AppError(
      httpStatus.CONFLICT,
      'User Already Exists With This Email.!',
      'UserAlreadyExists',
    );
  }

  const result = await User.create(payload);
  return result;
};

// get a single user from DB
const getSingleUserFromDb = async (id: string) => {
  const result = await User.findById(id);
  if (!result) {
    throw new AppError(
      httpStatus.NOT_FOUND,
      'No user found with this id.!',
      'UserNotFound',
    );
  }
  return result;
};

// get all users from DB
const getAllUsersFromDb = async () => {
  const result = await User.find();
  return result;
};

// update a user into DB
const updateUserIntoDb = async (id: string, payload: IUser) => {
  // The payload contains both primitive and non-primitive types of data, so I'm separating them to update properly

  const { name, contactInfo, ...remainingUserData } = payload;

  const modifiedUpdatedData: Record<string, unknown> = {
    ...remainingUserData,
  };

  // hash the password if password being updated
  if (payload.password) {
    modifiedUpdatedData.password = await bcrypt.hash(
      payload.password,
      Number(config.bcrypt_salt_round),
    );
  }

  if (name && typeof name === 'object' && Object.keys(name).length) {
    for (const [key, value] of Object.entries(name)) {
      modifiedUpdatedData[`name.${key}`] = value;
    }
  }

  if (
    contactInfo &&
    typeof contactInfo === 'object' &&
    Object.keys(contactInfo).length
  ) {
    for (const [key, value] of Object.entries(contactInfo)) {
      modifiedUpdatedData[`contactInfo.${key}`] = value;
    }
  }

  if (Object.keys(modifiedUpdatedData).length === 0) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'No valid fields provided for update',
    );
  }

  const result = await User.findByIdAndUpdate(id, modifiedUpdatedData, {
    new: true,
  });

  return result;
};

// ----------------------------------
export const UserServices = {
  createUser,
  getSingleUserFromDb,
  getAllUsersFromDb,
  updateUserIntoDb,
};
