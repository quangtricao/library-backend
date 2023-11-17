import { NextFunction, Response } from 'express';
import { ApiError } from '../errors/ApiError';
import jwt from 'jsonwebtoken';
import { DecodedUser, WithAuthRequest } from '../types/user';

export function checkAuth(req: WithAuthRequest, _: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];

  if (!token) {
    next(ApiError.forbidden('Token is missing.'));
    return;
  }
  try {
    const decoded = jwt.verify(token, process.env.TOKEN_SECRET as string) as DecodedUser;
    req.decodedUser = decoded;
    next();
  } catch (error) {
    next(ApiError.forbidden('Invalid token.'));
  }
}
