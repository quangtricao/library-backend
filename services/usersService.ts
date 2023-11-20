import { UserDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';
import bcrypt from 'bcrypt';
import { SALT_ROUNDS } from './authService';

const findAll = async () => {
  const users = await UserModel.find();
  return users;
};

const findOne = async (id: string) => {
  const user = await UserModel.findById(id);
  if (!user) {
    throw ApiError.resourceNotFound('User not found');
  }
  return user;
};

const findOneByEmail = async (email: string) => {
  return UserModel.findOne({ email });
};

const createOne = async (userDto: UserDto) => {
  const user = await UserModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
  if (userDto.password) {
    // 👆 This thing is always true
    // TODO: Transfer the password update logic to /auth/update-password
    const hashedPassword = bcrypt.hashSync(userDto.password, SALT_ROUNDS);
    userDto.password = hashedPassword;
  }
  const updatedUser = await UserModel.findByIdAndUpdate(id, userDto, { new: true });
  if (!updatedUser) {
    throw ApiError.resourceNotFound('User not found');
  }
  return updatedUser;
};

const deleteOne = async (id: string) => {
  const deleteUser = await UserModel.findById(id);
  if (!deleteUser) {
    throw ApiError.resourceNotFound('User not found');
  }
  await deleteUser.deleteOne();
};

const borrowBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId);
  const borrowedBooksIds = await Book.borrow(bookIds, user.id);
  return borrowedBooksIds;
};

const returnBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId);
  const returnedBooksIds = await Book.return(bookIds, user.id);
  return returnedBooksIds;
};

export default {
  findAll,
  findOne,
  createOne,
  findOneByEmail,
  updateOne,
  deleteOne,
  borrowBooks,
  returnBooks,
};
