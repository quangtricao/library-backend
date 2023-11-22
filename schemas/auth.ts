import { z } from 'zod';
import { UserDtoSchema } from './user';

export const LoginCredentialsSchema = z.object({
  email: UserDtoSchema.shape.email,
  password: UserDtoSchema.shape.password,
});

export const SignupCredentialsSchema = UserDtoSchema.strict();
