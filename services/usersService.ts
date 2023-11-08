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

const borrowBook = async (id: string, isbn: string) => {
  const user = await UserModel.findById(id);
  const book = await Book.findOne({ isbn: isbn });
  if (!user) {
    throw ApiError.resourceNotFound('User not found.');
  } else if (!book) {
    throw ApiError.resourceNotFound('Book not found.');
  } else if (book.status !== 'available') {
    throw ApiError.badRequest('Book is not available to borrow.');
  }

  const borrow_Date = new Date();
  const return_Date = new Date();
  return_Date.setDate(borrow_Date.getDate() + 30);

  user.borrowedBooks.isbn.push(isbn);
  book.borrowerId = user.id;
  book.status = 'borrowed';
  book.borrowDate = borrow_Date;
  book.returnDate = return_Date;
  await user.save();
  await book.save();
};

const returnBook = async (id: string, isbn: string) => {
  const user = await UserModel.findById(id);
  const book = await Book.findOne({ isbn: isbn });
  if (!user) {
    throw ApiError.resourceNotFound('User not found.');
  } else if (!book) {
    throw ApiError.resourceNotFound('Book not found.');
  } else if (book.status !== 'borrowed') {
    throw ApiError.badRequest('You did not borrow this book.');
  }

  const index = user.borrowedBooks.isbn.indexOf(isbn);
  if (index !== -1) {
    user.borrowedBooks.isbn.splice(index, 1);
    await user.save();
  }

  await Book.updateOne(
    { _id: book._id },
    { $unset: { borrowerId: 1, borrowDate: 1, returnDate: 1 }, $set: { status: 'available' } }
  );
};

export default {
  findAll,
  findOne,
  createOne,
  updateOne,
  deleteOne,
  borrowBook,
  returnBook,
};
