class AppError extends Error {
  public readonly statusCode: number;
  public readonly type?: string;

  constructor(
    statusCode: number = 500,
    message: string,
    type?: string,
    stack?: string,
  ) {
    super(message);
    this.statusCode = statusCode;
    this.type = type;

    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export default AppError;
