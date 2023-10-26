import { z } from 'zod';

export const genreSchema = z.object({
  title: z.string().min(1, {
    message: 'Title must not be empty',
  }),
  books: z
    .array(
      z.string().min(1, {
        message: 'Book must not be empty',
      })
    )
    .min(1),
});
