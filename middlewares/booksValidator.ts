import { NextFunction, Request, Response } from 'express';
import { z } from 'zod';

const BookDtoSchema = z.object({
  isbn: z.string({ required_error: 'Please provide ISBN' }).min(2).max(13),
  title: z.string({ required_error: 'Please provide title' }).min(2).max(100),
  image: z
    .string({ required_error: 'Please provide image' })
    .url('Please provide a somewhat valid url.'),
  authors: z
    .array(z.string(), {
      required_error: 'Please provide authors. Example: ["author-1"]',
    })
    .min(1, 'Please provide at least one author.'),
  publisher: z
    .string({ required_error: 'Please provide publisher' })
    .min(2)
    .max(100),
  publishedDate: z
    .string({ required_error: 'Please provide publishedDate' })
    .regex(
      /d{4}-\d{2}-\d{2}/,
      'Please provide a valid date. Example: 2021-01-01'
    ),
  status: z.enum(['available', 'borrowed']).default('available'),
  borrowerId: z.string().optional(),
  borrowDate: z
    .string()
    .regex(
      /d{4}-\d{2}-\d{2}/,
      'Please provide a valid borrowDate. Example: 2021-01-01'
    )
    .optional(),
  returnDate: z
    .string()
    .regex(
      /d{4}-\d{2}-\d{2}/,
      'Please provide a valid returnDate. Example: 2021-01-01'
    )
    .optional(),
});

const BookIsbnParamSchema = z.object({
  isbn: z.string({ required_error: 'Please provide ISBN' }),
});

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
