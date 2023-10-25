import { NextFunction, Request, Response } from 'express';

export function errorLoggingMiddleware(
  error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("Houston, we've got a problem:");
  console.log(error);
  res.json({ msg: error.message });
}
