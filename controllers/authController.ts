import { Request, Response } from 'express';
import { LoginCredentialsType } from '../types/auth';
import AuthService from '../services/authService';
import { UserDto } from '../types/users';
import statusLogger from '../utils/statusLogger';

async function login(req: Request<unknown, unknown, LoginCredentialsType>, res: Response) {
  const { email, password } = req.body;
  const { accessToken, user } = await AuthService.login({ email, password });
  res.status(200).json({ accessToken, user });
}

async function signup(req: Request<unknown, unknown, UserDto>, res: Response) {
  const userDto = req.body;
  const { accessToken, user } = await AuthService.signup(userDto);
  statusLogger.created('users', user.id);
  res.status(201).json({ accessToken, user });
}

export default {
  login,
  signup,
};
