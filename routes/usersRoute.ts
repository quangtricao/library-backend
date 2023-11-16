import express from 'express';
import UsersController from '../controllers/usersController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateUserDtoInput } from '../middlewares/usersValidator';
import { checkAuth } from '../middlewares/checkAuth';

export const userRouter = express.Router();

// This can be refactored & turned into admin route
userRouter.get('/', passThrowsToMiddleware(UsersController.getAllUsers));
userRouter.get('/:id', checkAuth, validateId, passThrowsToMiddleware(UsersController.getUserById));

userRouter.post('/login',checkAuth, passThrowsToMiddleware(UsersController.login));
userRouter.post('/signup', validateUserDtoInput,checkAuth, passThrowsToMiddleware(UsersController.signup))

userRouter.post('/:id/borrow', validateId, passThrowsToMiddleware(UsersController.borrowBooks));
userRouter.post('/:id/return', validateId, passThrowsToMiddleware(UsersController.returnBooks));

userRouter.put(
  '/:id',
  checkAuth,
  validateId,
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);


userRouter.delete('/:id', validateId, passThrowsToMiddleware(UsersController.deleteUserById));

export default userRouter;
