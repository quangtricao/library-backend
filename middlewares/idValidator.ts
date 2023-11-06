import { z } from 'zod';
import { CollectionType } from '../types/db';
import { NextFunction, Request, Response } from 'express';

/**
 * author: hientran
 * desc: this file has specifically designed to validate MongoDB _id
 * Validate ID to reduce unnecessary requests in the database
 * The key of the collection to get. "books" | "authors" | "genres" | "users"
 */
export const validateId = <K extends keyof CollectionType>(_key: K) => {
  const idSchema = z.string().refine(value => {
    // Validate that the ID is a 24-character hexadecimal string.
    const pattern = /^[a-fA-F\d]{24}$/;
    return pattern.test(value);
  }, {
    message: 'Invalid ID format for the specified collection.',
  });

  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await idSchema.parseAsync(req.params.id);
      next();
    } catch (error) {
      res.status(400).json({
        issues: [{
          code: "invalid_string",
          message: "Invalid ID.",
        }],
        name: "ZodError"
      });
    }
  };
};

