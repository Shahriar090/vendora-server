import AppError from '../../errors/appError';
import { IUser } from './user.interface';
import httpStatus from 'http-status';
import { User } from './user.model';

// create user
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

// ----------------------------------
export const UserServices = {
  createUser,
};
