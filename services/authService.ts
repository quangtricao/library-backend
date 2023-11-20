import { UserDto } from '../types/users';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import UsersService from './usersService';
import { LoginCredentialsType } from '../types/auth';

export const SALT_ROUNDS = 12;

const encodeJwtToken = (userId: string) => {
  const token = jwt.sign({ userId }, process.env.TOKEN_SECRET as string);
  return token;
};

const signup = async (userDto: UserDto) => {
  const emailTaken = await UsersService.findOneByEmail(userDto.email);
  if (emailTaken) {
    throw new Error('Email already in use');
  }

  const hashedPassword = await bcrypt.hash(userDto.password, SALT_ROUNDS);
  const user = await UsersService.createOne({
    ...userDto,
    password: hashedPassword,
  });

  return {
    accessToken: encodeJwtToken(user.id),
    user,
  };
};

const login = async (loginCredentials: LoginCredentialsType) => {
  const user = await UsersService.findOneByEmail(loginCredentials.email);
  if (!user) {
    throw new Error('Bad credentials');
  }

  const isValid = await bcrypt.compare(loginCredentials.password, user.password);
  if (!isValid) {
    throw new Error('Bad credentials');
  }

  const accessToken = encodeJwtToken(user.id);

  return {
    accessToken,
    user,
  };
};

export default {
  signup,
  login,
};
