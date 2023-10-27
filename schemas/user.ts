import { z } from 'zod';

export const UserDtoSchema = z.object({
  email: z.string({ required_error: 'Please provide email' }).email(),
  password: z.string({ required_error: 'Please provide password' }).min(6),
  image: z.string({ required_error: 'Please provide image' }).url(),
  firstName: z
    .string({ required_error: 'Please provide first name' })
    .min(2)
    .max(50),
  lastName: z
    .string({ required_error: 'Please provide last name' })
    .min(2)
    .max(50),
});
