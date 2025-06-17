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

// get a single user from DB
const getSingleUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const result = await UserServices.getSingleUserFromDb(id);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User Retrieved Successfully',
    data: result,
  });
});

// -----------------------------------
export const UserControllers = {
  createUser,
  getSingleUser,
};
