import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors/ApiError';

export function errorLoggingMiddleware(
  error: typeof ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    res.status(error.code).json({ msg: error.message });
    return;
  }

  res.status(500).json({ msg: 'Something went wrong' });
  console.error(error); // So we could see the error in all of its ugliness in the console
}
