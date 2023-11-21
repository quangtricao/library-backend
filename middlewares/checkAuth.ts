import { NextFunction, Response } from 'express';
import jwt from 'jsonwebtoken';
import { JwtPayloadType, WithAuthRequest } from '../types/users';
import UserModel from '../models/User';

export async function checkAuth(req: WithAuthRequest, res: Response, next: NextFunction) {
  const token = req.headers.authorization?.split(' ')[1];
  if (!token) {
    next(res.status(400).json({ msg: 'Token is missing.' }));
    return;
  }
  try {
    const { userId } = jwt.verify(token, process.env.TOKEN_SECRET as string) as JwtPayloadType;
    const findUser = await UserModel.findById(userId);

    if (!findUser) {
      next(res.status(403).json({ msg: 'Invalid token.' }));
      return;
    }

    req.user = findUser;
    next();
  } catch (error) {
    next(res.status(403).json({ msg: 'Invalid token.' }));
  }
}
