import express from 'express';
import UsersController from '../controllers/usersController';
import authenticationController from '../controllers/authenticationController'

import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';
import { validateId } from '../middlewares/idValidator';
import { checkAuth } from '../middlewares/checkAuth';
import { validateUserDtoInput } from '../middlewares/usersValidator';
import usersController from '../controllers/usersController';

export const authenRouter = express.Router();

authenRouter.get('/:id', checkAuth, validateId, passThrowsToMiddleware(usersController.getUserById));

authenRouter.post('/login',checkAuth, passThrowsToMiddleware(authenticationController.login));
authenRouter.post('/signup', validateUserDtoInput,checkAuth, passThrowsToMiddleware(authenticationController.signup))

authenRouter.put(
  '/:id',
  checkAuth,
  validateId,
  validateUserDtoInput,
  passThrowsToMiddleware(UsersController.updateUserById)
);

authenRouter.delete('/:id',checkAuth, validateId, passThrowsToMiddleware(usersController.deleteUserById));

export default authenRouter;
