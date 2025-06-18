import { JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import AppError from '../errors/appError';
import { TUserRole } from '../modules/user/user.interface';
import asyncHandler from '../utils/asyncHandler';
import httpStatus from 'http-status';
import { verifyJwt } from '../modules/auth/auth.utils';
import config from '../config';
import { User } from '../modules/user/user.model';

const auth = (...requiredRoles: TUserRole[]) => {
  return asyncHandler(async (req, res, next) => {
    const token = req.headers.authorization;

    if (!token) {
      throw new AppError(
        httpStatus.UNAUTHORIZED,
        'You are unauthorized. no token found.!',
        'NoToken',
      );
    }

    let decoded: JwtPayload;

    try {
      decoded = verifyJwt(
        token,
        config.access_token_secret as string,
      ) as JwtPayload;
    } catch (error) {
      if (error instanceof TokenExpiredError) {
        throw new AppError(
          httpStatus.UNAUTHORIZED,
          'Your token has expired. Please login again',
          'JwtExpired',
        );
      }
      throw new AppError(
        httpStatus.BAD_REQUEST,
        'Invalid token',
        'InvalidToken',
      );
    }
    const { role, email } = decoded;

    // Check if user exists
    const user = await User.isUserExists(email);
    if (!user) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'This user does not exist.!',
        'UserNotFound',
      );
    }

    // Check if user is deleted
    if (user.isDeleted) {
      throw new AppError(
        httpStatus.NOT_FOUND,
        'No user found. This user is deleted.!',
        'UserDeleted',
      );
    }

    // Check if user is blocked
    if (user.status === 'Blocked') {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'This user is blocked.!',
        'UserBlocked',
      );
    }

    // role check
    if (
      requiredRoles.length > 0 &&
      !requiredRoles.includes(role as TUserRole)
    ) {
      throw new AppError(
        httpStatus.FORBIDDEN,
        'You are not authorized.!',
        'UnauthorizedRole',
      );
    }
    req.user = decoded as JwtPayload;
    next();
  });
};

export default auth;
