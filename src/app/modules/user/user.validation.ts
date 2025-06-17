import { z } from 'zod';
import { USER_GENDER, USER_ROLES, USER_STATUS } from './user.constant';

// create user name validations
const createUserNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First Name Is Required').trim(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last Name Is Required').trim(),
});
// update user name validations
const updateUserNameValidationSchema = z.object({
  firstName: z.string().min(1, 'First Name Is Required').trim().optional(),
  middleName: z.string().optional(),
  lastName: z.string().min(1, 'Last Name Is Required').trim().optional(),
});

// create user validation schema
const createUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: createUserNameValidationSchema,
      gender: z.enum([
        USER_GENDER.Male,
        USER_GENDER.Female,
        USER_GENDER.Others,
      ]),
      age: z.number().int().min(18, 'Age Must Be At Least 18').optional(),
      contactInfo: z.object({
        mobileNo: z.string().min(1, 'Mobile number is required'),
        email: z.string().email('Invalid email address'),
      }),
      password: z
        .string()
        .min(6, 'Password Must Be At Least 6 Characters Long'),
      role: z
        .enum([USER_ROLES.Seller, USER_ROLES.Customer])
        .optional()
        .default(USER_ROLES.Customer)
        .optional(),
      status: z
        .enum([USER_STATUS.Active, USER_STATUS.Blocked])
        .optional()
        .default(USER_STATUS.Active)
        .optional(),
      isDeleted: z.boolean().optional().default(false).default(false),
    }),
  }),
});

// update user validation schema
const updateUserValidationSchema = z.object({
  body: z.object({
    user: z.object({
      name: updateUserNameValidationSchema.optional(),
      gender: z
        .enum([USER_GENDER.Male, USER_GENDER.Female, USER_GENDER.Others])
        .optional(),
      age: z.number().int().min(18, 'Age Must Be At Least 18').optional(),
      contactInfo: z
        .object({
          mobileNo: z.string().min(1, 'Mobile number is required'),
          email: z.string().email('Invalid email address'),
        })
        .optional(),
      password: z
        .string()
        .min(6, 'Password Must Be At Least 6 Characters Long')
        .optional(),
      role: z
        .enum([USER_ROLES.Seller, USER_ROLES.Customer])
        .optional()
        .default(USER_ROLES.Customer)
        .optional(),
      status: z
        .enum([USER_STATUS.Active, USER_STATUS.Blocked])
        .optional()
        .default(USER_STATUS.Active)
        .optional(),
      isDeleted: z
        .boolean()
        .optional()
        .default(false)
        .default(false)
        .optional(),
    }),
  }),
});

export const UserValidations = {
  createUserValidationSchema,
  updateUserValidationSchema,
};
