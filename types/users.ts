import { z } from 'zod';
import { UserDtoSchema } from '../schemas/user';

export type UserDto = z.infer<typeof UserDtoSchema>;
export type UserType = UserDto & { id: string; role: 'admin' | 'user' };
