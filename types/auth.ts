import z from 'zod';
import { LoginCredentialsSchema } from '../schemas/auth';

export type LoginCredentialsType = z.infer<typeof LoginCredentialsSchema>;
