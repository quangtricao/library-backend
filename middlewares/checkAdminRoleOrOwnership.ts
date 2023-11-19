import { NextFunction, Response } from 'express';
import { WithAuthRequest } from '../types/users';
import { ROLEVALUES } from '../common/auth';

export function checkAdminRoleOrOwnership(req: WithAuthRequest, res: Response, next: NextFunction) {
  if(req.user === undefined) {
    res.status(404).json({ msg: 'User not found'});
    return;
  }
  const { role, id } = req.user;
  const isAdmin = role === ROLEVALUES.ADMIN;
  const isOwner = id === req.params.id;
  if (!isAdmin && !isOwner) {
    res.status(403).json({ msg: 'Forbidden access!'});
    return;
  } 
  next();
}