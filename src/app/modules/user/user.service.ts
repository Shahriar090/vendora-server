import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { User } from './user.model';

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
// ----------------------------------
export const UserServices = {
  createUser,
  getSingleUserFromDb,
  getAllUsersFromDb,
};
