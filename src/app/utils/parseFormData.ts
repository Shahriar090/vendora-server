import { NextFunction, Request, Response } from 'express';

export const parseFormData = (
  req: Request,
  res: Response,
  next: NextFunction,
): void => {
  try {
    if (req.body.data) {
      req.body = JSON.parse(req.body.data);
    }
    next();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
  } catch (error: any) {
    res.status(400).json({
      success: false,
      message: 'Invalid JSON data in form-data',
      error: error.message,
    });
  }
};
