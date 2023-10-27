import { z } from 'zod';
import { CollectionType } from '../types/db';
import { NextFunction, Request, Response } from 'express';

// A generic version of what Tri had in his genres validator.

/**
 * Validate ID to reduce unnecessary requests in database
 * @param key The key of the collection to get. "books" | "authors" | "genres" | "users"
 */
export const validateId = <K extends keyof CollectionType>(key: K) => {
  const idSchema = z.string().startsWith(`${key}-`, {
    message: `Invalid ID. ID must follow this pattern: ${key}-{ID}`,
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await idSchema.parseAsync(req.params.id);
      next();
    } catch (error) {
      res.status(400).json(error);
    }
  };
};
