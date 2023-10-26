/*
author:hientran -julia.th
file name: troutes/userRoute.ts
*/
import express from 'express';
import { UserApiError } from '../errors/UserApiError';
import {
  getAllUsers,
  getUserById,
  deleteUserById,
  createUser,
  updateUserById,
} from '../db/usertools';
import { UserType, CreateUserDto } from '../types/users';
import { userApiErrorHandlers } from '../middlewares/userApiErrorHandler';

export const userRouter = express.Router();
userRouter.use(userApiErrorHandlers);

userRouter.get('/', async (_req, res, next) => {
  try {
    const users = await getAllUsers();
    console.log('Reached usersRouter GET /');
    res.json(users);
  } catch (error) {
    next(error);
  }
});

userRouter.get('/:id', async (req, res, next) => {
  const userId = req.params.id;
  try {
    const user = await getUserById(userId);
    if (!user) {
      throw UserApiError.ResourceNotFound(`User with ID: ${userId} not found`);
    }
    res.json(user);
  } catch (error) {
    next(error);
  }
});

userRouter.post('/', async (req, res, next) => {
  const userDto: CreateUserDto = req.body;
  try {
    const newUser = await createUser(userDto);
    res.json(newUser);
  } catch (error) {
    next(error);
  }
});

userRouter.put('/:id', async (req, res, next) => {
  const userId = req.params.id;
  const updatedUserData: Partial<UserType> = req.body;
  try {
    const updatedUser = await updateUserById(userId, updatedUserData);
    if (!updatedUser) {
      throw UserApiError.ResourceNotFound(`User with ID: ${userId} not found`);
    }
    res.json(updatedUser);
  } catch (error) {
    next(error);
  }
});

userRouter.delete('/:id', async (req, res, next) => {
  const userId = req.params.id;
  const deleteUserData: Partial<UserType> = req.body;
  try {
    const deleteUser = await updateUserById(userId, deleteUserData);
    if (!deleteUser) {
      throw UserApiError.ResourceNotFound(`User with ID: ${userId} not found`);
    }
    await deleteUserById(userId);
    res.json({ message: `User with ID: ${userId} deleted successfully!` });
  } catch (error) {
    next(error);
  }
});
