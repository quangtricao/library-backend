import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import StatusLogger from '../utils/statusLogger';
import { UserDto } from '../types/users';
import { ApiError } from '../errors/ApiError';

async function getAllUsers(_req: Request, res: Response) {
  const users = await UsersService.findAll();
  res.status(200).json(users);
}

async function getUserById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const user = await UsersService.findOne(id);
  res.status(200).json(user);
}

async function createUser(
  req: Request<unknown, unknown, UserDto>,
  res: Response
) {
  const userDto = req.body;
  const newUser = await UsersService.createOne(userDto);
  StatusLogger.created('users', newUser.id);
  res.status(201).json(newUser);
}

async function updateUserById(
  req: Request<{ id: string }, unknown, UserDto>,
  res: Response
) {
  const { id } = req.params;
  const userDto = req.body;
  const updatedUser = await UsersService.updateOne(id, userDto);
  res.status(200).json(updatedUser);
}

async function deleteUserById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  await UsersService.deleteOne(id);
  res.status(204).end();
}

async function borrowBooks(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const { isbns } = req.body;
  try {
    const borrowedIsbns = await UsersService.borrowBook(id, isbns);
    res.status(200).json(borrowedIsbns);
  } catch (error) {
    throw ApiError.badRequest(`${error}`);
  }
}

async function returnBooks(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const { isbns } = req.body;
  try {
    const returnedIsbns = await UsersService.returnBook(id, isbns);
    if (returnedIsbns.length > 0) {
      res.status(200).json(returnedIsbns);
    } else {
      throw ApiError.badRequest('No valid books found for return.');
    }
  } catch (error) {
      res.json(error);
  }
}

export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  borrowBooks,
  returnBooks,
};
