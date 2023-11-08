import express from 'express';
import UsersController from '../controllers/usersController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateUserDtoInput } from '../middlewares/usersValidator';

export const userRouter = express.Router();

userRouter.get('/', passThrowsToMiddleware(UsersController.getAllUsers));
userRouter.get('/:id', validateId, passThrowsToMiddleware(UsersController.getUserById));
userRouter.post('/', validateUserDtoInput, passThrowsToMiddleware(UsersController.createUser));
userRouter.put(
  '/:id',
  validateId,
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);
userRouter.delete('/:id', validateId, passThrowsToMiddleware(UsersController.deleteUserById));

userRouter.post('/:id/borrow', validateId, passThrowsToMiddleware(UsersController.borrowBooks));
userRouter.post('/:id/return', validateId, passThrowsToMiddleware(UsersController.returnBooks));

export default userRouter;
