import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

const genreSchema = z.string().startsWith('genres-', {
  message: 'Invalid ID. ID must start with: genres-{ID}',
});

export async function validateIdMiddleware(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await genreSchema.parseAsync(req.params.id);
    return next();
  } catch (error) {
    return res.status(400).json(error);
  }
}
