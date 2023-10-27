import express from 'express';
import UsersController from '../controllers/usersController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateUserDtoInput } from '../middlewares/usersValidator';

export const userRouter = express.Router();

userRouter.get('/', passThrowsToMiddleware(UsersController.getAllUsers));
userRouter.get(
  '/:id',
  validateId('users'),
  passThrowsToMiddleware(UsersController.getUserById)
);
userRouter.post(
  '/',
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.createUser)
);
userRouter.put(
  '/:id',
  validateId('users'),
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);
userRouter.delete(
  '/:id',
  validateId('users'),
  passThrowsToMiddleware(UsersController.deleteUserById)
);

export default userRouter;
