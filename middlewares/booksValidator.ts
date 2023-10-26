import { NextFunction, Request, Response } from 'express';
import { BookDtoSchema, BookIsbnParamSchema } from '../schemas/book';

async function validateBookDtoInput(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await BookDtoSchema.parseAsync(req.body);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}

async function validateBookIsbnParam(
  req: Request,
  res: Response,
  next: NextFunction
) {
  try {
    await BookIsbnParamSchema.parseAsync(req.params);
    next();
  } catch (error) {
    res.status(400).json(error);
  }
}

export default {
  validateBookDtoInput,
  validateBookIsbnParam,
};
