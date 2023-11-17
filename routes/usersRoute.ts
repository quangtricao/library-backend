import express from 'express';
import UsersController from '../controllers/usersController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateUserDtoInput } from '../middlewares/usersValidator';
import { checkAuth } from '../middlewares/checkAuth';
import { checkAdminRole } from '../middlewares/checkAdminRole';

export const userRouter = express.Router();

userRouter.get('/', checkAuth, checkAdminRole, passThrowsToMiddleware(UsersController.getAllUsers));
userRouter.get('/:id', checkAuth, validateId, passThrowsToMiddleware(UsersController.getUserById));

userRouter.post('/login', checkAuth, passThrowsToMiddleware(UsersController.login));
userRouter.post('/signup', validateUserDtoInput, passThrowsToMiddleware(UsersController.signup));

userRouter.post(
  '/:id/borrow',
  checkAuth,
  validateId,
  passThrowsToMiddleware(UsersController.borrowBooks)
);
userRouter.post(
  '/:id/return',
  checkAuth,
  validateId,
  passThrowsToMiddleware(UsersController.returnBooks)
);

userRouter.put(
  '/:id',
  checkAuth,
  validateId,
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);

userRouter.delete(
  '/:id',
  checkAuth,
  checkAdminRole,
  validateId,
  passThrowsToMiddleware(UsersController.deleteUserById)
);

export default userRouter;
