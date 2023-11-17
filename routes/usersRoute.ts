import express from 'express';
import UsersController from '../controllers/usersController';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { validateUserDtoInput } from '../middlewares/usersValidator';
import { checkAuth } from '../middlewares/checkAuth';
import { checkRoles } from '../middlewares/checkRoles';
import { ROLEVALUES } from '../common/auth';

export const userRouter = express.Router();

// This can be refactored & turned into admin route
userRouter.get(
  '/',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN),
  passThrowsToMiddleware(UsersController.getAllUsers)
);
userRouter.get(
  '/:id',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN, ROLEVALUES.USER),
  validateId,
  passThrowsToMiddleware(UsersController.getUserById)
);

userRouter.post('/login', passThrowsToMiddleware(UsersController.login));
userRouter.post('/signup', validateUserDtoInput, passThrowsToMiddleware(UsersController.signup));

userRouter.post(
  '/:id/borrow',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN, ROLEVALUES.USER),
  validateId,
  passThrowsToMiddleware(UsersController.borrowBooks)
);
userRouter.post(
  '/:id/return',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN, ROLEVALUES.USER),
  validateId,
  passThrowsToMiddleware(UsersController.returnBooks)
);

userRouter.put(
  '/:id',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN, ROLEVALUES.USER),
  validateId,
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);

userRouter.delete(
  '/:id',
  checkAuth,
  checkRoles(ROLEVALUES.ADMIN),
  validateId,
  passThrowsToMiddleware(UsersController.deleteUserById)
);

export default userRouter;
