import { NextFunction, Request, Response } from 'express';

import { ApiError } from '../errors/ApiError';

export function errorLoggingMiddleware(
  error: typeof ApiError | Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  if (error instanceof ApiError) {
    console.log("Houston, we've got a problem:");
    console.log(error);
    res.status(error.code).json({ msg: error.message });
    return;
  }
}
