import AppError from '../../errors/appError';
import { User } from '../user/user.model';
import { TLoginInfo } from './auth.interface';
import httpStatus from 'http-status';
import { generateJwt } from './auth.utils';
import config from '../../config';

// login user
const loginUser = async (payload: TLoginInfo) => {
  const user = await User.isUserExists(payload.email);

  if (!user) {
    throw new AppError(httpStatus.NOT_FOUND, 'User not found', 'UserNotFound');
  }

  //   check if the user is deleted
  const isDeleted = user?.isDeleted;
  if (isDeleted) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This user is deleted',
      'UserIsDeleted',
    );
  }

  //   check if the user is blocked
  const userStatus = user?.status;
  if (userStatus === 'Blocked') {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'This user has been blocked.!',
      'UserHasBeenBlocked',
    );
  }

  //   check if the hashed password matched properly with plain text password
  if (!(await User.isPasswordMatched(payload.password, user.password))) {
    throw new AppError(
      httpStatus.BAD_REQUEST,
      'Wrong password..! password did not matched.! Please try again.',
      'WrongPassword',
    );
  }

  //   generate access and refresh token
  const jwtPayload = {
    id: user?._id,
    email: user?.contactInfo?.email,
    role: user.role!,
  };

  const accessToken = generateJwt(
    jwtPayload,
    config.access_token_secret as string,
    config.access_token_expiry as string,
  );

  const refreshToken = generateJwt(
    jwtPayload,
    config.refresh_token_secret as string,
    config.refresh_token_expiry as string,
  );

  return {
    accessToken,
    refreshToken,
    user,
  };
};

// ------------------------------------
export const AuthServices = {
  loginUser,
};
