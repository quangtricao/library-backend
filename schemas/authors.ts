import { z } from 'zod';

export const AuthorDtoSchema = z.object({
  firstName: z.string({ required_error: 'Please provide firstName' }),
  lastName: z.string({ required_error: 'Please provide lastName' }),
  bio: z.string({ required_error: 'Please provide author bio' }),
  image: z
    .string({ required_error: 'Please provide image' })
    .url('Please provide a somewhat valid url.'),
  books: z.array(z.string()),
});
