import { z } from 'zod';
import { CollectionType } from '../types/db';
import { NextFunction, Request, Response } from 'express';

const idSchema = z.string().regex(/^[a-fA-F\d]{24}$/, 'Invalid ID');

export const validateId = <K extends keyof CollectionType>(_key?: K) => {
  return async (req: Request, res: Response, next: NextFunction) => {
    try {
      await idSchema.parseAsync(req.params.id);
      next();
    } catch (error) {
      res.status(400).json(error instanceof z.ZodError ? error.errors : error);
    }
  };
};