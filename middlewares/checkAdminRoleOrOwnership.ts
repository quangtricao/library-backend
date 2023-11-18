import { NextFunction, Response } from 'express';
import { WithAuthRequest } from '../types/users';
import { ROLEVALUES } from '../common/auth';

export function checkAdminRoleOrOwnership(req: WithAuthRequest, res: Response, next: NextFunction) {
  const user = req.decodedUser;
  const isAdmin = user && user.role === ROLEVALUES.ADMIN;
  const isOwner = user && user.userId === req.params.userId;

  if (!isAdmin && !isOwner) {
    res.status(403).json({ msg: 'Forbidden access!'});
    return;
  }
  next();
}