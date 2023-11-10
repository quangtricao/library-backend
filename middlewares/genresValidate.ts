import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';
import { genreSchema } from '../schemas/genre';

export async function validateGenreDtoInput(req: Request, res: Response, next: NextFunction) {
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
