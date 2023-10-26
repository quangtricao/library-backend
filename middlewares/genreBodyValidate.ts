import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

const genreSchema = z.object({
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

export async function validateGenre(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await genreSchema.parseAsync(req.body);
    return next();
  } catch (error) {
    if (error instanceof z.ZodError) {
      const newError = error.issues.map((err) => ({
        path: err.path,
        error: err.message,
      }));
      return res.status(400).json(newError);
    }
    next();
  }
}
