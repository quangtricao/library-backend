import { NextFunction, Request, Response } from 'express';

export function errorLoggingMiddleware(
  _error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log("Houston, we've got a problem:");
  console.log(_error);
  res.json({ msg: _error.message });
}
