import { NextFunction, Request, Response } from 'express';

export function errorLoggingMiddleware(
  _error: Error,
  _req: Request,
  res: Response,
  _next: NextFunction
) {
  console.log('👀 ERRROOOR!!');
  res.json({ msg: _error.message });
}
