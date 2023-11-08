import { UserDto } from '../types/users';
import UserModel from '../models/User';
import { ApiError } from '../errors/ApiError';
import Book from '../models/Book';

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

const createOne = async (userDto: UserDto) => {
  const user = await UserModel.create(userDto);
  return user;
};

const updateOne = async (id: string, userDto: UserDto) => {
  const updatedUser = await UserModel.findByIdAndUpdate(id, userDto, { new: true });

  if (!updatedUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }
  return updatedUser;
};

const deleteOne = async (id: string) => {
  const deleteUser = await UserModel.findById(id);
  if (!deleteUser) {
    throw ApiError.resourceNotFound('User ID not found');
  }
  await deleteUser.deleteOne();
};

const borrowBooks = async (userId: string, bookIds: string[]) => {
  const user = await findOne(userId); // TODO: Replace this logic with protection middleware later
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
  updateOne,
  deleteOne,
  borrowBooks,
  returnBooks,
};
