import express from 'express';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import AuthController from '../controllers/authController';
import AuthValidator from '../middlewares/authValidator';

export const authRouter = express.Router();

authRouter.post(
  '/login',
  AuthValidator.validateLoginCredentials,
  passThrowsToMiddleware(AuthController.login)
);

authRouter.post(
  '/signup',
  AuthValidator.validateSignupInput,
  passThrowsToMiddleware(AuthController.signup)
);
