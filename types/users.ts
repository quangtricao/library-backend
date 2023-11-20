import { z } from 'zod';
import { UserDtoSchema } from '../schemas/user';
import { JwtPayload } from 'jsonwebtoken';
import { ROLEVALUES } from '../common/auth';
import { Request } from 'express';

export type UserDto = z.infer<typeof UserDtoSchema>;

export type UserType = UserDto & { id: string; role: Role };

export interface DecodedUser extends JwtPayload {
  _id: string;
  role: Role;
  password: string;
  firstName: string;
  lastName: string;
  email: string;
  image: string;
}

export const role = ROLEVALUES;
export type Role = keyof typeof role;

export interface WithAuthRequest extends Request {
  user?: DecodedUser;
}

