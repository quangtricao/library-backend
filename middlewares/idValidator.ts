import { z } from 'zod';
import { CollectionType } from '../types/db';
import { NextFunction, Request, Response } from 'express';

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
      res.status(400).json({error});
    }
  };
};

