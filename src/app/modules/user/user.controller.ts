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

// get all users from DB
const getAllUsers = asyncHandler(async (req, res) => {
  const result = await UserServices.getAllUsersFromDb();

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'All Users Retrieved Successfully',
    data: result,
  });
});

// update a user into DB
const updateUser = asyncHandler(async (req, res) => {
  const { id } = req.params;
  const userData = req.body.user;
  const result = await UserServices.updateUserIntoDb(id, userData);

  sendResponse(res, {
    statusCode: httpStatus.OK,
    success: true,
    message: 'User information updated successfully',
    data: result,
  });
});

// -----------------------------------
export const UserControllers = {
  createUser,
  getSingleUser,
  getAllUsers,
  updateUser,
};
