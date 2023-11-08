import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import StatusLogger from '../utils/statusLogger';
import { UserDto } from '../types/users';

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

async function borrowBook(req: Request<{ id: string, isbn: string }>, res: Response) {
  const {id, isbn} = req.params;
  await UsersService.borrowBook(id, isbn);
  res.status(200).send('Book borrowed Successfully.');
}

async function returnBook(req: Request<{ id: string; isbn: string }>, res: Response) {
  const { id, isbn } = req.params;
  await UsersService.returnBook(id, isbn);
  res.status(200).send('Book returned successfully');
}


export default {
  getAllUsers,
  getUserById,
  createUser,
  updateUserById,
  deleteUserById,
  borrowBook,
  returnBook,
};
