import { Request, Response } from 'express';
import UsersService from '../services/usersService';
import StatusLogger from '../utils/statusLogger';
import { UserDto } from '../types/users';
import { ApiError } from "../errors/ApiError";

async function getAllUsers(_req: Request, res: Response) {
  const users = await UsersService.findAll();
  res.status(200).json(users);
}

async function getUserById(req: Request<{ id: string }>, res: Response) {
  const { id } = req.params;
  const user = await UsersService.findOne(id);
  res.status(200).json(user);
}

async function updateUserById(req: Request<{ id: string }, unknown, UserDto>, res: Response) {
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

async function borrowBooks(req: Request<{ id: string }, string[]>, res: Response) {
  const { id } = req.params;
  const bookIds = req.body;
  const borrowedBooksIds = await UsersService.borrowBooks(id, bookIds);
  res.status(200).send(borrowedBooksIds);
}

async function returnBooks(req: Request<{ id: string }, string[]>, res: Response) {
  const { id } = req.params;
  const bookIds = req.body;
  const returnedBooksIds = await UsersService.returnBooks(id, bookIds);
  res.status(200).send(returnedBooksIds);
}

async function signup(req: Request<UserDto>, res: Response){
  const userDto = req.body;

  const newUser = await UsersService.createOne(userDto)
  StatusLogger.created('users', newUser.id);
  res.status(201).json({ msg: 'User successfully created', newUser})
}

async function login(req: Request, res: Response){
  const {email, password} = req.body
  const login = await UsersService.login(email, password)

  if(!login.status){
      throw ApiError.badRequest("Bad credentials")
  }
  res.status(200).json({message: login.message, accessToken: login.accessToken})
}

export default {
  getAllUsers,
  getUserById,
  updateUserById,
  deleteUserById,
  borrowBooks,
  returnBooks,
  signup,
  login,
};
