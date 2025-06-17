import asyncHandler from '../../utils/asyncHandler';
import httpStatus from 'http-status';
import { UserServices } from './user.service';
import sendResponse from '../../utils/sendResponse';

// create user
const createUser = asyncHandler(async (req, res) => {
  const result = await UserServices.createUser(req.body.user);

  sendResponse(res, {
    statusCode: httpStatus.CREATED,
    success: true,
    message: 'User created successfully',
    data: result,
  });
});

// -----------------------------------
export const UserControllers = {
  createUser,
};
