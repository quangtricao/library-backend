import { z } from 'zod';
import { UserDtoSchema } from '../schemas/user';
import { JwtPayload } from 'jsonwebtoken';

export type UserDto = z.infer<typeof UserDtoSchema>;

export const roleValues = {
    USER: 'USER',
    ADMIN: 'ADMIN',
} as const
export const role = roleValues;
export type Role = keyof typeof role

export type UserType = UserDto & { id: string; role: Role };
export interface DecodedUser extends JwtPayload {
    userId: string
    email: string
}

 