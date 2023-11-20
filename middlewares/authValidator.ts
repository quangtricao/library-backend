import { NextFunction, Request, Response } from 'express';
import { LoginCredentialsSchema } from '../schemas/auth';
import { validateUserDtoInput } from './usersValidator';

async function validateLoginCredentials(req: Request, res: Response, next: NextFunction) {
  try {
    await LoginCredentialsSchema.parseAsync(req.body);
    next();
  } catch (e) {
    next(e);
  }
}

const validateSignupInput = validateUserDtoInput;

export default {
  validateLoginCredentials,
  validateSignupInput,
};
