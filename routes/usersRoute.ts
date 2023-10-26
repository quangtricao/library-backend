/*
author:hientran -julia.th
description: user router 
*/
import express from 'express';
import usersController from '../controllers/usersController';
import { userApiErrorHandlers } from '../middlewares/users/userApiErrorHandler';
import { passThrowsToMiddleware } from '../utils/passThrowsToMiddleware';

export const userRouter = express.Router();
userRouter.use(userApiErrorHandlers);

userRouter.get('/', passThrowsToMiddleware(usersController.getAllUser));

userRouter.get('/:id', passThrowsToMiddleware(usersController.getById));

userRouter.get('/email/:email', passThrowsToMiddleware(usersController.getByEmail));

userRouter.post('/', passThrowsToMiddleware(usersController.createNewUser));

userRouter.put('/:id', passThrowsToMiddleware(usersController.alterUser));

userRouter.delete('/:id', passThrowsToMiddleware(usersController.deleteById));

export default userRouter;
