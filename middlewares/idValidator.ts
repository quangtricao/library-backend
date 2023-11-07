import { z } from 'zod';
import { NextFunction, Request, Response } from 'express';

export const validateId = async (req: Request, res: Response, next: NextFunction) => {
  const idSchema = z.string().regex(/^[a-fA-F\d]{24}$/, 'Invalid ID');
  try {
    await idSchema.parseAsync(req.params.id);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
};
