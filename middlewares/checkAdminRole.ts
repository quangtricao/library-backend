import { NextFunction, Response } from 'express';
import { WithAuthRequest } from '../types/users';
import { ApiError } from '../errors/ApiError';
import { ROLEVALUES } from '../common/auth';

export function checkAdminRole(req: WithAuthRequest, res: Response, next: NextFunction) {
  const user = req.decodedUser;
  const isAdmin = user && user.role === ROLEVALUES.ADMIN;

  if (!isAdmin) {
    next(ApiError.forbidden('Forbidden access!'));
    return;
  }

  next();
}