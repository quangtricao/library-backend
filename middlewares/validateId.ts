import { NextFunction, Request, Response } from 'express';

export function validateIdMiddleware(
  req: Request,
  _res: Response,
  next: NextFunction
) {
  if (!req.params.id.startsWith('genres-')) {
    next({ message: 'Invalid ID' });
    return;
  }
  next();
}
